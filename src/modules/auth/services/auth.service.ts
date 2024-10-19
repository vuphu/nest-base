import { JwtPayload, SignInResponse } from '../types';
import { UserService } from '@/modules/users/services';
import { User } from '@/modules/users/models';
import { env } from '@/configs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isNil } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyPayload(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findUserById(payload.id);
    if (isNil(user)) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async generateAuthTokens(user: Partial<User>): Promise<SignInResponse> {
    const payload: JwtPayload = { id: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: env.JWT.REFRESH_TOKEN.SECRET,
        expiresIn: env.JWT.REFRESH_TOKEN.EXPIRES,
      }),
    };
  }
}
