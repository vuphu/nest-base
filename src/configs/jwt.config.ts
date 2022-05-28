import { JwtModule } from '@nestjs/jwt';
import { env } from './env.config';

export const JwtConfig = JwtModule.register({
  secret: env.JWT_SECRET_KEY,
  signOptions: { expiresIn: '1d' },
});
