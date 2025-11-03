import { Module } from '@nestjs/common';
import { MediaHandlerService } from './media_handler.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  
  providers: [MediaHandlerService, CloudinaryProvider],
  exports: [MediaHandlerService, CloudinaryProvider],
})
export class MediaHandlerModule {}
