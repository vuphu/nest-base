import { env } from './env.config';
import { JwtModule } from '@nestjs/jwt';

export const JwtConfig = JwtModule.register({
  secret: env.JWT.ACCESS_TOKEN.SECRET,
  signOptions: { expiresIn: '1d' },
});
