import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { MediaHandlerModule } from 'src/media_handler/media_handler.module';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationHandlerModule } from 'src/notification_handler/notification_handler.module';

@Module({
  imports: [UserModule  , MediaHandlerModule , DatabaseModule , NotificationHandlerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
