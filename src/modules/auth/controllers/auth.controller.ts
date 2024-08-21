import { AuthService } from '../services';
import { SignInResponse } from '../types';
import { SignInRequestDto, SignUpRequestDto, SignInResponseDto } from '../dtos';
import { ResponseInterceptor } from '@/common';
import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.NO_CONTENT)
  signUp(@Body() dto: SignUpRequestDto): Promise<void> {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  @ApiResponse({ type: SignInResponseDto })
  @UseInterceptors(new ResponseInterceptor(SignInResponseDto))
  async signIn(@Body() dto: SignInRequestDto): Promise<SignInResponse> {
    return this.authService.signIn(dto);
  }
}
