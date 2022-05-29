import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy } from './strategies';
import { JwtConfig } from '@/configs';
import { UserModule } from '@/modules/users';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtConfig, UserModule, PassportModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
