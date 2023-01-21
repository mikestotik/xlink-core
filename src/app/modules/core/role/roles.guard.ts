import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../../decor/roles.decorator';
import { Role } from '../../../enums/role.enum';
import { parseBearer } from '../../../utils/common.utils';
import { JwtPayload } from '../../../interfaces/auth.interface';


@Injectable()
export class RolesGuard implements CanActivate {

  private static getAuthorizationRoles(authorization: string): Role[] {
    const token = parseBearer(authorization);

    if (!token) {
      throw new ForbiddenException('Access Denied: RolesGuard.getAuthorizationRoles');
    }

    const payload = parseJwt(token);
    return payload.roles;
  }


  constructor(
    private reflector: Reflector) {
  }


  public canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest();
    const roles = RolesGuard.getAuthorizationRoles(request.headers.authorization);

    const exists = requiredRoles.some((role) => roles.includes(role));

    if (!exists) {
      throw new ForbiddenException(`This resource requires the following roles: [${ requiredRoles }]`);
    }
    return exists;
  }

}


export function parseJwt(token: string): JwtPayload {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
