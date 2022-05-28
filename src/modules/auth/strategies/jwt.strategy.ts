import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'src/configs/env.config';
import { User } from 'src/modules/users/models/user.model';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.authService.verifyPayload(payload);
  }
}
