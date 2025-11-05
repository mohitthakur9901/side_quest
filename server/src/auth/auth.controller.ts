import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginAuthDto } from './dto/login-auth.sto';
import express from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('signup')
  @UseInterceptors(FileInterceptor('profileImage'))
  create(
    @Body() createAuthDto: CreateAuthDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.authService.create(createAuthDto, file);
  }


  @Post('login')
  async login(@Body() loginUserDto: LoginAuthDto, @Res({ passthrough: true }) res: express.Response) {
    console.log(loginUserDto);
    
    const result = await this.authService.login(loginUserDto);

    // Set token as cookie
    res.cookie('access_token', result.access_token, {
      httpOnly: true,       // prevents JavaScript access
      secure: process.env.NODE_ENV === 'production', // send only over HTTPS in production
      sameSite: 'lax',      // CSRF protection (use 'strict' or 'none' if needed)
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    return { message: 'Login successful' };
  }

  @Get('/auth_route')
  findAll() {
    return {
      message: 'Hello World!',
    };
  }
}
