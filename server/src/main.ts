import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });

  config({
    path: join(__dirname, '..', '.env'),
  });

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  await app.listen(3000);
}
void bootstrap();
