import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as PassportGuard } from '@nestjs/passport';
import { decode } from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class AuthGuard extends PassportGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    const response = super.handleRequest(err, user, info, context, status);

    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    request.sessionId = decode(token)['session_id'];

    return response;
  }
}
