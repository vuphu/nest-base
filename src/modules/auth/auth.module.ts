import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy } from './strategies';
import { RefreshTokenUseCase, SignInUseCase, SignUpUseCase } from './use-cases';
import { JwtConfig } from '@/configs';
import { UserModule } from '@/modules/users';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtConfig, UserModule, PassportModule],
  providers: [JwtStrategy, AuthService, SignUpUseCase, SignInUseCase, RefreshTokenUseCase],
  controllers: [AuthController],
})
export class AuthModule {}
