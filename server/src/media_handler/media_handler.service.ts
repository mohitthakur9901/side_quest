import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
@Injectable()
export class MediaHandlerService {
  async uploadFileToClodinary(imagePath: string) {
    try {
      if (!imagePath) {
        return;
      }
      const res = await cloudinary.uploader.upload(imagePath, {
        resource_type: 'auto',
      });
      fs.unlinkSync(imagePath);
      return res;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      console.error('Cloudinary upload error:', error);
      return null;
    }
  }

  deleteFileFromClodinary(publicId: string) {
    try {
      if (!publicId) {
        return;
      }
      const res = cloudinary.uploader.destroy(publicId);
      return res;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }
}
