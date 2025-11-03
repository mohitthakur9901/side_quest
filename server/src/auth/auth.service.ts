import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { MediaHandlerService } from 'src/media_handler/media_handler.service';

import bcrypt from 'bcrypt';
import { NotificationHandlerService } from 'src/notification_handler/notification_handler.service';

@Injectable()
export class AuthService {


  constructor(
    private readonly prisma: DatabaseService,
    private readonly media_handler: MediaHandlerService,
    private readonly notificationService: NotificationHandlerService
  ) { }


  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    const { email, firstName, lastName, password, role, phone, username, bio } = createUserDto;
    try {
      // validate user if exists
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }, { username }],
        },
      })
      if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      // validate user data 
      if (!email || !firstName || !lastName || !password || !phone || !username) {
        throw new HttpException('Missing user data', HttpStatus.BAD_REQUEST);
      }
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // upload profile image
      let profileImageUrl: string | null = null;
      if (file?.path) {
        const uploadResult = await this.media_handler.uploadFileToClodinary(
          file.path,
        );
        profileImageUrl = uploadResult?.secure_url || null;
      }

      // create user
      const newUser = await this.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword,
          phone,
          username,
          bio,
          role,
          profileImage: profileImageUrl,
        },
      });
      // send notification
      this.notificationService.sendNotificationToUser(email,
        "You Just Signed Up into the App",
        "Welcome to the app, your account has been created successfully you can login now and start using the app");

    } catch (error) {

      return console.error({ error });

    }

  }

}
