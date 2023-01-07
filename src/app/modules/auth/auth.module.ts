import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';


@Module({
  imports: [
    JwtModule.register({}),
    UserModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ],
  exports: [
    JwtModule
  ]
})
export class AuthModule {}
