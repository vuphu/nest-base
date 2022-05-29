import { env } from './env.config';
import { JwtModule } from '@nestjs/jwt';

export const JwtConfig = JwtModule.register({
  secret: env.JWT_SECRET_KEY,
  signOptions: { expiresIn: '1d' },
});
