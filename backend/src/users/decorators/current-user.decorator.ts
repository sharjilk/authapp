import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator to inject the current user into route handlers.
 * Retrieves the user from the request object, where it was previously attached by the CurrentUserInterceptor.
 */
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
