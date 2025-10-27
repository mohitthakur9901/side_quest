import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { MediaHandlerModule } from './media_handler/media_handler.module';
import { NotificationHandlerModule } from './notification_handler/notification_handler.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    MediaHandlerModule,
    NotificationHandlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
