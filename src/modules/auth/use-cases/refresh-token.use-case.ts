import { RefreshTokenRequestDto } from '../dtos';
import { JwtPayload, SignInResponse } from '../types';
import { AuthService } from '../services';
import { env } from '@/settings';
import { UserService } from '@/modules/users/services';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class RefreshTokenUseCase {
  constructor(public dto: RefreshTokenRequestDto) {}
}

@CommandHandler(RefreshTokenUseCase)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenUseCase, SignInResponse> {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async execute(command: RefreshTokenUseCase): Promise<SignInResponse> {
    const { dto } = command;
    try {
      const authPayload: JwtPayload = await this.jwtService.verifyAsync(dto.token, {
        secret: env.JWT.REFRESH_TOKEN.SECRET,
      });
      const user = await this.userService.findUserById(authPayload.sub);
      return this.authService.generateAuthTokens(user);
    } catch (exception) {
      if (exception instanceof TokenExpiredError) {
        throw new UnauthorizedException();
      }
      throw exception;
    }
  }
}
