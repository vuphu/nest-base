import { env } from './env.setting';
import { JwtModule } from '@nestjs/jwt';

export const JwtSetting = JwtModule.register({
  secret: env.JWT.ACCESS_TOKEN.SECRET,
  signOptions: { expiresIn: env.JWT.ACCESS_TOKEN.EXPIRES },
});
