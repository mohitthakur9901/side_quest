import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationHandlerService {
  sendEmailOtpToUser(email: string, otp: string) {
    console.log(email, otp);
  }

  verifyEmailOtp(email: string, otp: string) {
    console.log(email, otp);
  }
}
