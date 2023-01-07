import { Role } from '../enums/role.enum';


export interface LoginPayload {
  accessToken: string;
  refreshToken: string;
}


export interface JwtPayload {
  sub: number;
  email: string;
  roles: Role[];
  iat?: number;
  exp?: number;
}
