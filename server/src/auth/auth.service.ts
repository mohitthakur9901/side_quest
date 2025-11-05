import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { MediaHandlerService } from 'src/media_handler/media_handler.service';

import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NotificationHandlerService } from 'src/notification_handler/notification_handler.service';
import { LoginAuthDto } from './dto/login-auth.sto';

@Injectable()
export class AuthService {


  constructor(
    private readonly prisma: DatabaseService,
    private readonly media_handler: MediaHandlerService,
    private readonly notificationService: NotificationHandlerService,
    private readonly jwtService: JwtService
  ) { }

  async create(createUserDto: CreateAuthDto, file?: Express.Multer.File) {
    // console.log(createUserDto , file?.originalname);
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
  async login(loginUserDto: LoginAuthDto) // : Promise<{ access_token: string }>
  {
    const { username, email, password } = loginUserDto;
    // console.log(loginUserDto);
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (!user) throw new UnauthorizedException('User not found');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

      const payload = { sub: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload);

      // Optional: persist token in DB if you want
      await this.prisma.user.update({
        where: { id: user.id },
        data: { accessToken },
      });
      // send notification to user for login
      this.notificationService.sendNotificationToUser(user.email,
        "You Just Logged In into the App",
        "Welcome back to the app, you have just logged in");
      return { access_token: accessToken };
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Login failed. Please check your credentials.');
    }
  }


}
