import { SignInRequestDto } from '../dtos';
import { SignInResponse } from '../types';
import { AuthService } from '../services';
import { UserService } from '@/modules/users/services';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class SignInUseCase {
  constructor(public dto: SignInRequestDto) {}
}

@CommandHandler(SignInUseCase)
export class SignInHandler implements ICommandHandler<SignInUseCase, SignInResponse> {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async execute(command: SignInUseCase): Promise<SignInResponse> {
    const { email, password } = command.dto;
    const user = await this.userService.verifyUser(email, password);
    return this.authService.generateAuthTokens(user);
  }
}
