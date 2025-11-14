import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MediaHandlerService } from 'src/media_handler/media_handler.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PoolsService } from 'src/pools/pools.service';
import bcrypt from 'bcrypt';


@Injectable()
export class UserService {

  constructor(
    private readonly prisma: DatabaseService,
    private readonly media_handler: MediaHandlerService,
    private readonly poolsService: PoolsService
  ) { }

  // create user
  async updateUserProfileImage(userId: string, profileImage: Express.Multer.File) {
    try {

      // upload profile image to cloudinary then update profile link
      const uploadResult = await this.media_handler.uploadFileToClodinary(
        profileImage.path
      );
      if (!uploadResult) {
        throw new HttpException('Error uploading profile image', HttpStatus.BAD_REQUEST);
      }

      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          profileImage: uploadResult.secure_url
        },
      });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  // update user
  async updateUserAccount(updateUserDto: UpdateUserDto, id: string) {
    const { email, firstName, lastName, password, bio, phone, role, username } = updateUserDto;
    try {
      const user = await this.prisma.user.update({
        where: {
          id, status: "ACTIVE"
        },
        data: {
          email,
          firstName,
          lastName,
          password,
          bio,
          phone,
          role,
          username,
        }

      });
      // send email to user
      return user

    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  // delete data
  async deleteUserAccount(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id
        }
      });
      return {
        message: 'User deleted successfully'
      }
    } catch (error) {
      return console.log({ error });
    }
  }
  // get user by  id
  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        }
      })
      return user
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }
  }
  // update user password
  async updateUserCurrentPassword(id: string, password: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id
        }
      })
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isPasswordVaild = bcrypt.compare(password, user?.password);
      if (!isPasswordVaild) {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.prisma.user.update({
        where: {
          id
        },
        data: {
          password: hashedPassword
        }
      })

      return new HttpException('Password updated successfully', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


  // update user status for polling
  async updateStatus(id: string, status: 'ACTIVE' | 'INACTIVE') {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { status },
      });

      if (status === 'ACTIVE') {

        // Validate location before adding to pool
        if (
          !updatedUser.city ||
          updatedUser.latitude === null ||
          updatedUser.longitude === null
        ) {
          throw new HttpException(
            'User must have valid city, latitude, and longitude to become ACTIVE',
            HttpStatus.BAD_REQUEST,
          );
        }

        await this.poolsService.addUserToPool({
          userId: id,
          city: updatedUser.city,
          latitude: updatedUser.latitude,
          longitude: updatedUser.longitude,
        });

        console.log(`User ${id} is now active — added to pool`);
        
      }

      if (status === 'INACTIVE') {
        await this.poolsService.removeUserFromPool(id);
        console.log(`User ${id} is now inactive — removed from pool`);
      }
      
      return { message: 'User status updated successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // get users only for admin
  async getUsers(query: any) {
    try {
      const { search, role, status } = query;

      const users = await this.prisma.user.findMany({
        where: {
          status: status || 'ACTIVE',
          role: role ? role.toUpperCase() : undefined,
          OR: search
            ? [
              { firstName: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
              { username: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ]
            : undefined,
        },
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
          questProgress: true,
        },
      });
      return users
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }
  }
  // ban user only for admin
  async banUser(id: string) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: { status: 'BANNED' },
      });
      return {
        message: 'User banned successfully',
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


}
