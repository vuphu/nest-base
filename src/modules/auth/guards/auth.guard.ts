import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as PassportGuard } from '@nestjs/passport';
import jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class AuthGuard extends PassportGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    const response = super.handleRequest<TUser>(err, user, info, context, status);
    const request = context.switchToHttp().getRequest<{ sessionId: string }>();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    request.sessionId = jwt.decode(token)['session_id'] as string | undefined;
    return response;
  }
}
