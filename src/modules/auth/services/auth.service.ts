import { JwtPayload, Token } from '../types';
import { SignInRequestDto, RegisterRequestDto } from '../dtos';
import { User, UserService } from '@/modules/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyPayload(payload: JwtPayload): Promise<User> {
    const user = await this.userService.getUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async verifyUser(email: string, password: string): Promise<Partial<User>> {
    return this.userService.verifyUser(email, password);
  }

  async registerUser(dto: RegisterRequestDto): Promise<void> {
    return this.userService.createUser(dto);
  }

  async verifyAndGenerateToken(dto: SignInRequestDto): Promise<Token> {
    const { email, password } = dto;

    const user = await this.userService.verifyUser(email, password);
    const payload: JwtPayload = { id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
