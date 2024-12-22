import { SignUpRequestDto } from '../dtos';
import { SignInResponse } from '../types';
import { AuthService } from '../services';
import { UserService } from '@/modules/users/services';
import { User } from '@/modules/users/models';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { Transactional } from '@nestjs-cls/transactional';

export class SignUpUseCase {
  constructor(public dto: SignUpRequestDto) {}
}

@CommandHandler(SignUpUseCase)
export class SignUpHandler implements ICommandHandler<SignUpUseCase, SignInResponse> {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Transactional()
  async execute(command: SignUpUseCase): Promise<SignInResponse> {
    const { dto } = command;
    const partialUser: Partial<User> = {
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
    };
    const user = await this.userService.createUser(partialUser);
    return this.authService.generateAuthTokens(user);
  }
}
