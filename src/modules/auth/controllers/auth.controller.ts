import { LoginDto, RegisterDto } from '../dtos';
import { AuthService } from '../services';
import { Token } from '../types';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  createUser(@Body() dto: RegisterDto): Promise<void> {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<Token> {
    return this.authService.login(dto);
  }
}
