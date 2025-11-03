import { Injectable } from '@nestjs/common';
import resend from 'src/config/resend';

@Injectable()
export class NotificationHandlerService {


  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
  }



  async sendNotificationToUser(email: string, subject: string, text: string) {
    try {

      const otp = this.generateOtp();

      const { error, data } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: subject,
        text: text
      })
      if (error) {
        return console.error({ error });

      }
      return data;

    } catch (error) {

      return console.error({ error });

    }

  }
  async sendEmailOtpToUser(email: string) {
    try {

      const otp = this.generateOtp();

      const { error, data } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: "Email Verification",
        text: `Your verification code is ${otp}`
      })

      if (error) {
        return console.error({ error });

      }

    } catch (error) {

      return console.error({ error });

    }


  }

  verifyEmailOtp(email: string, otp: string) {
    try {


    } catch (error) {

    }
  }
}
