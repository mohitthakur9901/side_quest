import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MediaHandlerService } from 'src/media_handler/media_handler.service';

// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly media_handler: MediaHandlerService,
  ) {}

  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    const { email, firstName, lastName, password, role, phone, username, bio } =
      createUserDto;

    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });

      if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      let profileImageUrl: string | null = null;
      if (file?.path) {
        const uploadResult = await this.media_handler.uploadFileToClodinary(
          file.path,
        );
        profileImageUrl = uploadResult?.secure_url || null;
      }

      const newUser = await this.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword,
          role,
          phone,
          username,
          bio,
          profileImage: profileImageUrl,
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
}
