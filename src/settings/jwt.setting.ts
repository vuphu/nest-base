import { env } from './env.setting';
import { JwtModule } from '@nestjs/jwt';

export const JwtSetting = JwtModule.register({
  secret: env.JWT.ACCESS_TOKEN.SECRET,
  signOptions: { expiresIn: '1d' },
});
