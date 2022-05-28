import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';
import { Token } from '../types/token.type';

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
