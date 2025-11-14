import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MediaHandlerModule } from 'src/media_handler/media_handler.module';
import { QuestMiddleware } from './quest.middleware';
import { PoolsModule } from 'src/pools/pools.module';

@Module({
  imports: [DatabaseModule , MediaHandlerModule, PoolsModule],
  controllers: [QuestsController],
  providers: [QuestsService],
})
export class QuestsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QuestMiddleware)
      .forRoutes(QuestsController);
  }

}