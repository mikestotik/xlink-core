import { Injectable } from '@nestjs/common';
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import { MailerConfig } from '../config/mailer.config';


@Injectable()
export class EmailService {

  private readonly transporter: Transporter<SentMessageInfo>;


  constructor() {
    this.transporter = createTransport(MailerConfig());
  }


  public send(options: Options): Promise<unknown> {
    return this.transporter.sendMail(options);
  }
}