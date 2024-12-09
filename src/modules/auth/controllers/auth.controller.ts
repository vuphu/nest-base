import { AuthUser, SignInResponse } from '../types';
import { SignInRequestDto, SignUpRequestDto, SignInResponseDto, RefreshTokenRequestDto, SignOutRequestDto } from '../dtos';
import { RefreshTokenUseCase, SignInUseCase, SignOutUseCase, SignUpUseCase } from '../use-cases';
import { ResponseInterceptor } from '@/common';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '../guards';
import { CurrentSessionId, CurrentUser } from '../decorators';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('sign-up')
  @ApiResponse({ type: SignInResponseDto })
  @UseInterceptors(new ResponseInterceptor(SignInResponseDto))
  signUp(@Body() dto: SignUpRequestDto): Promise<SignInResponse> {
    return this.commandBus.execute(new SignUpUseCase(dto));
  }

  @Post('sign-in')
  @ApiResponse({ type: SignInResponseDto })
  @UseInterceptors(new ResponseInterceptor(SignInResponseDto))
  async signIn(@Body() dto: SignInRequestDto): Promise<SignInResponse> {
    return this.commandBus.execute(new SignInUseCase(dto));
  }

  @Post('refresh-token')
  @ApiResponse({ type: SignInResponseDto })
  @UseInterceptors(new ResponseInterceptor(SignInResponseDto))
  async refreshToken(@Body() dto: RefreshTokenRequestDto): Promise<SignInResponse> {
    return this.commandBus.execute(new RefreshTokenUseCase(dto));
  }

  @Post('sign-out')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async signOut(
    @CurrentUser() user: AuthUser,
    @CurrentSessionId() sessionId: string,
    @Body() dto: SignOutRequestDto,
  ): Promise<void> {
    return this.commandBus.execute(new SignOutUseCase(user.id, sessionId, dto));
  }
}
