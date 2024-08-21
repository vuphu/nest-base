import { JwtPayload, SignInResponse } from '../types';
import { SignInRequestDto, SignUpRequestDto } from '../dtos';
import { UserService } from '@/modules/users/services';
import { User } from '@/modules/users/models';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isNil } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyPayload(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findUserById(payload.id);
    if (isNil(user)) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async signUp(dto: SignUpRequestDto): Promise<void> {
    await this.userService.createUser(dto);
  }

  async signIn(dto: SignInRequestDto): Promise<SignInResponse> {
    const { email, password } = dto;

    const user = await this.userService.verifyUser(email, password);
    const payload: JwtPayload = { id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
