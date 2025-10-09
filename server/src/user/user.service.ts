import {
  HttpException,
  HttpStatus,
  Injectable,
  Response,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    const { email, firstName, lastName, password, role, phone, username } =
      createUserDto;
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
          phone: phone,
        },
      });
      if (user) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const newUser = await this.prisma.user.create({
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          role: role,
          phone: phone,
          username: username,
        },
      });
      return {
        message: 'User created successfully',
        user: newUser,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
