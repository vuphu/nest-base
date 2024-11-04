import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy } from './extensions/auth-strategies';
import { RefreshTokenHandler, SignInHandler, SignUpHandler } from './use-cases';
import { JwtConfig } from '@/configs';
import { UserModule } from '@/modules/users';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [CqrsModule, JwtConfig, UserModule, PassportModule],
  providers: [JwtStrategy, AuthService, SignUpHandler, SignInHandler, RefreshTokenHandler],
  controllers: [AuthController],
})
export class AuthModule {}
