import { AuthService } from '../../services';
import { env } from '@/settings';
import { User } from '@/modules/users/models';
import { transform } from '@/common';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { camelCase } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT.ACCESS_TOKEN.SECRET,
    });
  }

  async validate(payload: object): Promise<User> {
    return this.authService.verifyPayload(transform(payload, camelCase));
  }
}
