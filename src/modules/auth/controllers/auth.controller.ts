import { AuthService } from '../services';
import { Token } from '../types';
import { LoginRequestDto, RegisterRequestDto } from '../dtos';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  createUser(@Body() dto: RegisterRequestDto): Promise<void> {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginRequestDto): Promise<Token> {
    return this.authService.login(dto);
  }
}
