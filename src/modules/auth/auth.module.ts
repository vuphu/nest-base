import { AuthController } from './controllers';
import { AuthService, AuthSessionService } from './services';
import { JwtStrategy } from './extensions/auth-strategies';
import { RefreshTokenHandler, SignInHandler, SignUpHandler } from './use-cases';
import { AuthSession } from './models';
import { AuthSessionRepository } from './repositories';
import { SignOutHandler } from './use-cases/sign-out.use-case';
import { JwtSetting } from '@/settings';
import { UserModule } from '@/modules/users';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CqrsModule, JwtSetting, TypeOrmModule.forFeature([AuthSession]), UserModule, PassportModule],
  providers: [
    JwtStrategy,
    AuthSessionRepository,
    AuthService,
    AuthSessionService,
    SignUpHandler,
    SignInHandler,
    RefreshTokenHandler,
    SignOutHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
