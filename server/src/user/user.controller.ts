import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  UseInterceptors,
  Query,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Role } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }



  @Post('/updateProfileImage/:id')
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './public/temp',
      filename: (req, file, cb) => {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${suffix}${extname(file.originalname)}`);
      }
    })
  }))

  updateProfileImage(userId: string, profileImage: Express.Multer.File) {
    return this.userService.updateUserProfileImage(userId, profileImage);
  }

  @Post('/update/:id')
  updateuser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserAccount(updateUserDto, id);
  }

  @Delete("/delete/:id")
  remove(@Param('id') id: string) {
    return this.userService.deleteUserAccount(id);
  }

  @Get("/get/:id")
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'ACTIVE' | 'INACTIVE'
  ) {
    return this.userService.updateStatus(id, status);
  }


  // for admin only


  
  @Get("/get")
  getUsers(@Query() query: string) {
    return this.userService.getUsers(query);
  }
  @Patch(':id/ban')
  async banUser(@Param('id') id: string) {
    return this.userService.banUser(id);
  }

  @Patch(':id/role')
  async upateUser(@Param('id') id: string, @Body('role') role: Role) {
    return this.userService.updateUserRole(id, role);
  }

}
