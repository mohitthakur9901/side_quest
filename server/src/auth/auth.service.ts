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

  async generateAccessAndRefreshToken(
    userId: string,
    role: string
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const payload = { id: userId, role: role };

      const access_token = this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      });

      const refresh_token = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });
      return { access_token, refresh_token };
    } catch (error) {
      throw new HttpException(
        'Error generating tokens',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async create(createUserDto: CreateAuthDto, profileImage?: Express.Multer.File) {
    const { email, firstName, lastName, password, role, phone,
      username, bio, latitude, longitude, city, country } = createUserDto;

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
      if (!email || !firstName || !lastName || !password || !phone || !username ||
        !role || !bio || !latitude || !longitude || !city || !country) {
        throw new HttpException('Missing user data', HttpStatus.BAD_REQUEST);
      }
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // fix uploading bug in the cloudinary
      // upload profile image
      let profileImageUrl: string | null = null;
      if (profileImage?.path) {
        const uploadResult = await this.media_handler.uploadFileToClodinary(
          profileImage.path,
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
          city,
          country,
          latitude: Number(latitude),
          longitude: Number(longitude)
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
  async login(loginUserDto: LoginAuthDto): Promise<{ access_token: string, refresh_token: string, user: any }> {
    const { username, email, password } = loginUserDto;
    // send users live location when logging in
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },

      });
      if (user?.status == "BANNED") {
        throw new HttpException('User is banned', HttpStatus.BAD_REQUEST);
      }

      // TODO  add status check if Inactive then send email to active account 
      if (!user) throw new UnauthorizedException('User not found');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

      // make a function to generate token 
      const { access_token, refresh_token } =
        await this.generateAccessAndRefreshToken(user.id, user.role);
      const UserData = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        bio: user.bio,
        role: user.role,
        profileImage: user.profileImage
      }

      // send notification to user for login
      this.notificationService.sendNotificationToUser(user.email,
        "You Just Logged In into the App",
        "Welcome back to the app, you have just logged in");

      // send both refresh token and access token
      return { access_token, refresh_token, user: UserData };
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Login failed. Please check your credentials.');
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  async refreshActionToken(userId: string, refreshToken: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user || !user.refreshToken)
        throw new UnauthorizedException('Access Denied');

      const refreshTokenMatches = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );

      if (!refreshTokenMatches)
        throw new UnauthorizedException('Invalid refresh token');

      // Generate new pair of tokens
      const { access_token, refresh_token } =
        await this.generateAccessAndRefreshToken(user.id, user.role);

      // Save new refresh token in DB
      await this.updateRefreshToken(user.id, refresh_token);

      return { access_token, refresh_token };
    } catch (error) {
      console.error('Refresh token error:', error);
      throw new UnauthorizedException('Token refresh failed');
    }
  }
  // login with google 
  async loginWithGoogle() {
    try {
      return { message: 'Login with Google successful' };

    } catch (error) {
      throw new UnauthorizedException('Login with Google failed. Please check your credentials.');

    }
  }

}
