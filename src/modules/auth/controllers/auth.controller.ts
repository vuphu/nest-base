import { SignInResponse } from '../types';
import { SignInRequestDto, SignUpRequestDto, SignInResponseDto, RefreshTokenRequestDto } from '../dtos';
import { RefreshTokenUseCase, SignInUseCase, SignUpUseCase } from '../use-cases';
import { ResponseInterceptor } from '@/common';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private signUpUseCase: SignUpUseCase,
    private signInUseCase: SignInUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('sign-up')
  @ApiResponse({ type: SignInResponseDto })
  @UseInterceptors(new ResponseInterceptor(SignInResponseDto))
  signUp(@Body() dto: SignUpRequestDto): Promise<SignInResponse> {
    return this.signUpUseCase.execute(dto);
  }

  @Post('sign-in')
  @ApiResponse({ type: SignInResponseDto })
  @UseInterceptors(new ResponseInterceptor(SignInResponseDto))
  async signIn(@Body() dto: SignInRequestDto): Promise<SignInResponse> {
    return this.signInUseCase.execute(dto);
  }

  @Post('refresh-token')
  @ApiResponse({ type: SignInResponseDto })
  @UseInterceptors(new ResponseInterceptor(SignInResponseDto))
  async refreshToken(@Body() dto: RefreshTokenRequestDto): Promise<SignInResponse> {
    return this.refreshTokenUseCase.execute(dto);
  }
}
