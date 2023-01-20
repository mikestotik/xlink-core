import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../../../interfaces/auth.interface';


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_ACCESS_TOKEN_SECRET
    });
  }


  public validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}