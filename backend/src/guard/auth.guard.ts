import { CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * AuthGuard is a custom guard that checks if the user is authenticated.
 * It checks if the userId is present in the session, indicating that the user is logged in.
 */
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}
