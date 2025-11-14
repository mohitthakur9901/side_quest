import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { MediaHandlerModule } from './media_handler/media_handler.module';
import { NotificationHandlerModule } from './notification_handler/notification_handler.module';
import { QuestsModule } from './quests/quests.module';
import { UserController } from './user/user.controller';
import { AuthMiddleware } from './auth.middleware';
import { PoolsModule } from './pools/pools.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    MediaHandlerModule,
    NotificationHandlerModule,
    QuestsModule,
    PoolsModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(AppController, UserController);
  }

}
