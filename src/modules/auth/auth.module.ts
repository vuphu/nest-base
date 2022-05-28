import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from 'src/configs/jwt.config';
import { UserModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtConfig, UserModule, PassportModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
