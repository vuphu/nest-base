import { AuthService } from '../services';
import { Token } from '../types';
import { SignInRequestDto, RegisterRequestDto, TokenResponseDto } from '../dtos';
import { ResponseInterceptor } from '@/common';
import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  createUser(@Body() dto: RegisterRequestDto): Promise<void> {
    return this.authService.registerUser(dto);
  }

  @Post('sign-in')
  @ApiResponse({ type: TokenResponseDto })
  @UseInterceptors(new ResponseInterceptor(TokenResponseDto))
  async signIn(@Body() dto: SignInRequestDto): Promise<Token> {
    return this.authService.verifyAndGenerateToken(dto);
  }
}
