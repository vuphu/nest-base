import { LoginDto, RegisterDto } from '../dtos';
import { JwtPayload, Token } from '../types';
import { User, UserService } from '@/modules/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async verifyPayload(payload: JwtPayload): Promise<User> {
    const user = await this.userService.getUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async verifyUser(username: string, password: string): Promise<Partial<User>> {
    return this.userService.verifyUser(username, password);
  }

  async register(dto: RegisterDto): Promise<void> {
    return this.userService.createUser(dto);
  }

  async login(dto: LoginDto): Promise<Token> {
    const { username, password } = dto;

    const user = await this.userService.verifyUser(username, password);
    const payload: JwtPayload = { id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
