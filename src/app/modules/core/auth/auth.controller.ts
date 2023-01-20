import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import { TokenPayload } from '../../../decor/token.decorator';
import { parseBearer } from '../../../utils/common.utils';
import { UserCredentials } from '../user/user.dto';
import { AccessTokenGuard, RefreshTokenGuard } from './auth.guard';
import { JwtPayload, LoginPayload } from '../../../interfaces/auth.interface';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService) {
  }


  @Post('login')
  public signIn(@Body() credentials: UserCredentials): Promise<LoginPayload> {
    return this.authService.login(credentials);
  }


  @UseGuards(AccessTokenGuard)
  @Get('logout')
  public logout(@TokenPayload() payload: JwtPayload): Promise<void> {
    return this.authService.logout(payload.sub);
  }


  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  public refreshTokens(@TokenPayload() payload: JwtPayload, @Headers() headers: IncomingHttpHeaders): Promise<LoginPayload> {
    return this.authService.refreshTokens(payload.sub, parseBearer(headers.authorization));
  }
}