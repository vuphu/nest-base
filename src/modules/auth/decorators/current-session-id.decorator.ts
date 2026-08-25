import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentSessionId = createParamDecorator((_: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ sessionId: string }>();
  return request.sessionId;
});
