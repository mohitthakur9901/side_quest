import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MediaHandlerService } from 'src/media_handler/media_handler.service';

@Module({
  imports: [DatabaseModule, MediaHandlerService],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
