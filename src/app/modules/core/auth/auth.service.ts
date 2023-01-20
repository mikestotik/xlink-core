import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../../enums/role.enum';
import { CryptoUtils } from '../../../utils/crypto.utils';
import { EmailUtils } from '../../../utils/email.utils';
import { UserCredentials } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { LoginPayload } from '../../../interfaces/auth.interface';


@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService) {
  }


  public async login(credentials: UserCredentials): Promise<LoginPayload> {
    EmailUtils.validate(credentials.email);

    const user = await this.userService.validateUser(credentials.email, credentials.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const roles = user.roles?.map(i => i.title) as Role[];
    const tokens = await this.getTokens(user.id, user.email, roles);

    const hashedRefreshToken = CryptoUtils.hash(tokens.refreshToken);
    await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }


  public async logout(userId: number): Promise<void> {
    await this.userService.updateRefreshToken(userId, '');
  }


  private async getTokens(userId: number, email: string, roles: Role[]): Promise<LoginPayload> {
    const accessToken = this.jwtService.sign(
      { sub: userId, email, roles },
      {
        secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.AUTH_ACCESS_TOKEN_SECRET_TTL,
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId, email, roles },
      {
        secret: process.env.AUTH_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.AUTH_REFRESH_TOKEN_SECRET_TTL,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }


  public async refreshTokens(userId: number, refreshToken: string | null): Promise<LoginPayload> {
    if (!refreshToken) {
      throw new ForbiddenException('Access Denied: No token');
    }

    const user = await this.userService.findOne(userId);

    if (!user.refresh) {
      throw new ForbiddenException('Access Denied: No saved refresh tokens');
    }

    const refreshTokenMatches = CryptoUtils.compareHashes(refreshToken, user.refresh);

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied: tokens not matched');
    }

    const roles = user.roles?.map(i => i.title) as Role[];
    const tokens = await this.getTokens(user.id, user.username, roles);

    const hashedRefreshToken = CryptoUtils.hash(tokens.refreshToken);
    await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }

}