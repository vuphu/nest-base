import { RefreshTokenRequestDto } from '../dtos';
import { JwtPayload, SignInResponse } from '../types';
import { AuthService } from '../services';
import { env } from '@/settings';
import { UserService } from '@/modules/users/services';
import { transform } from '@/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { camelCase } from 'lodash';

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
      const authPayload: JwtPayload = transform(
        this.jwtService.verify(dto.token, { secret: env.JWT.REFRESH_TOKEN.SECRET }),
        camelCase,
      );
      const user = await this.userService.findUserById(authPayload.sub);
      return this.authService.generateAuthTokens(user, authPayload.sessionId);
    } catch (exception) {
      if (exception instanceof TokenExpiredError) {
        throw new UnauthorizedException();
      }
      throw exception;
    }
  }
}
