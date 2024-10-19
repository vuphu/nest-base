import { SignUpRequestDto } from '../dtos';
import { SignInResponse } from '../types';
import { AuthService } from '../services';
import { UserService } from '@/modules/users/services';
import { UseCase } from '@/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignUpUseCase extends UseCase {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  async execute(dto: SignUpRequestDto): Promise<SignInResponse> {
    const user = await this.userService.createUser(dto);
    return this.authService.generateAuthTokens(user);
  }
}
