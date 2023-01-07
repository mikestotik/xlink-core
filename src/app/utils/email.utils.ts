import { BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';


export class EmailUtils {
  public static validate(email: string): void {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    if (!isEmail(email)) {
      throw new BadRequestException('Wrong email format');
    }
  }


  public static parseUsername(email: string): string {
    return email.split('@')[0];
  }
}