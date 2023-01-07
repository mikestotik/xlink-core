import { Options } from 'nodemailer/lib/smtp-transport';

export const MailerConfig = (): Options => ({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  debug: true,
  logger: true
});
