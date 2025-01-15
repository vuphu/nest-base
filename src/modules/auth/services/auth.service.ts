import { AuthSessionService } from './auth-session.service';
import { JwtPayload, SignInResponse } from '../types';
import { UserService } from '@/modules/users/services';
import { User } from '@/modules/users/models';
import { env } from '@/settings';
import { transform } from '@/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isNil, snakeCase } from 'lodash';
import dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private authSessionService: AuthSessionService,
    private jwtService: JwtService,
  ) {}

  async verifyPayload(payload: JwtPayload): Promise<User> {
    const [user, session] = await Promise.all([
      this.userService.findUserById(payload.sub),
      this.authSessionService.findSession(payload.sessionId),
    ]);
    if (isNil(user) || isNil(session)) {
      throw new UnauthorizedException();
    }
    if (session.userId !== user.id || payload.iat < dayjs(session.issuedAt).unix()) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async generateAuthTokens(user: User, sessionId?: string): Promise<SignInResponse> {
    if (isNil(sessionId)) {
      const session = await this.authSessionService.createSession(user.id);
      sessionId = session.id;
    } else {
      await this.authSessionService.refreshSession(user.id, sessionId);
    }

    const payload: object = transform(<JwtPayload>{ sub: user.id, sessionId }, snakeCase);

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: env.JWT.REFRESH_TOKEN.SECRET,
        expiresIn: env.JWT.REFRESH_TOKEN.EXPIRES,
      }),
    };
  }
}
