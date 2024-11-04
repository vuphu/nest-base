import { SignInResponse } from '../types';
import { SignInRequestDto, SignUpRequestDto, SignInResponseDto, RefreshTokenRequestDto } from '../dtos';
import { RefreshTokenUseCase, SignInUseCase, SignUpUseCase } from '../use-cases';
import { ResponseInterceptor } from '@/common';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';

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
}
