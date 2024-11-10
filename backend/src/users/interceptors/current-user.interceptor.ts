import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
/**
 * Interceptor to retrieve the current user based on the session data.
 * Attaches the user object to the request if a valid userId exists in the session.
 */
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  /**
   * Intercepts incoming requests to check for a user ID in the session.
   * If a user ID is found, retrieves the user from the database and attaches it to the request object.
   * @param {ExecutionContext} context - The context of the request.
   * @param {CallHandler} handler - The next handler in the request pipeline.
   * @returns {Observable<any>} The response from the next handler.
   */
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
