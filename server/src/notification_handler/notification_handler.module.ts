import { Module } from '@nestjs/common';
import { NotificationHandlerService } from './notification_handler.service';

@Module({
  providers: [NotificationHandlerService],
  exports: [NotificationHandlerService],
})
export class NotificationHandlerModule {}
