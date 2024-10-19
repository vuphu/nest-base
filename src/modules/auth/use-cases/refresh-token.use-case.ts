import { RefreshTokenRequestDto } from '../dtos';
import { JwtPayload, SignInResponse } from '../types';
import { AuthService } from '../services';
import { UseCase } from '@/common';
import { env } from '@/configs';
import { UserService } from '@/modules/users/services';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RefreshTokenUseCase extends UseCase {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    super();
  }

  async execute(dto: RefreshTokenRequestDto): Promise<SignInResponse> {
    try {
      const authPayload: JwtPayload = await this.jwtService.verifyAsync(dto.token, {
        secret: env.JWT.REFRESH_TOKEN.SECRET,
      });
      const user = await this.userService.findUserById(authPayload.id);
      return this.authService.generateAuthTokens(user);
    } catch (exception) {
      if (exception instanceof TokenExpiredError) {
        throw new UnauthorizedException();
      }
      throw exception;
    }
  }
}
