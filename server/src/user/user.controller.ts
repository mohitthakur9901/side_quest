import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './public/temp',
        filename: (req, file, cb) => {
          const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${suffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    return this.userService.create(createUserDto, file);
  }
}
