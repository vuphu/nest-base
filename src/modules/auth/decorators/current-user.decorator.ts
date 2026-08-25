import { AuthUser } from '../types/auth-user.type';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<{ user?: AuthUser }>();
  return request.user;
});
