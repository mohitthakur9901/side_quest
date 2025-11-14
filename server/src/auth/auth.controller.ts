import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginAuthDto } from './dto/login-auth.sto';
import express from 'express';
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './public/temp',
      filename: (req, file, cb) => {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${suffix}${extname(file.originalname)}`);
      }
    })
  }))
  create(
    @Body() createAuthDto: CreateAuthDto,
    @UploadedFile() profileImage: Express.Multer.File
  ) {
    return this.authService.create(createAuthDto, profileImage);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginAuthDto,
    @Res({ passthrough: true }) res: express.Response
  ) {
    const result = await this.authService.login(loginUserDto);

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15 minutes
    });

    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    // send userid in request

    return { message: 'Login successful', user: result.user };
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }

  @Post('loginWithGoogle')
  loginWithGoogle() {
    return this.authService.loginWithGoogle();
  }

  @Post('refresh')
  async refresh(@Req() req) {
    console.log(req.cookie);

    const { userId, refreshToken } = req.cookie;
    return this.authService.refreshActionToken(userId, refreshToken);
  }

}
