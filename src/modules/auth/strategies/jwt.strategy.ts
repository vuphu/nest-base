import { AuthService } from '../services';
import { JwtPayload } from '../types';
import { env } from '@/configs';
import { User } from '@/modules/users/models';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT.ACCESS_TOKEN.SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.authService.verifyPayload(payload);
  }
}
