import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MediaHandlerModule } from 'src/media_handler/media_handler.module';

@Module({
  imports: [DatabaseModule , MediaHandlerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
