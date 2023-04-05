import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  // 506941f56e8324e88222df6970567c19-us11

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: '',
      port: 587,
      secure: false,
      auth: {
        user: '',
        pass: '',
      },
    });
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'COMPANY_EMAIL',
      to,
      subject,
      text: body,
    });
  }
}
