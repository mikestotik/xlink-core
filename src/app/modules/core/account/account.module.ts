import { Module } from '@nestjs/common';
import { EmailService } from '../../../services/email.service';
import { AuthModule } from '../auth/auth.module';
import { ConfirmModule } from '../confirm/confirm.module';
import { UserModule } from '../user/user.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';


@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfirmModule
  ],
  controllers: [
    AccountController
  ],
  providers: [
    AccountService,
    EmailService
  ]
})
export class AccountModule {}
