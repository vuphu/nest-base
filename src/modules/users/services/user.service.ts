import { User } from '../models';
import { UserRepository } from '../repositories';
import { CreateUserDto } from '../dtos/requests';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as brcypt from 'bcrypt';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ id: userId });
  }

  async createUser(dto: CreateUserDto): Promise<void> {
    const { email, password } = dto;

    const isUserExisted = await this.userRepository.exist({ where: { email } });
    if (isUserExisted) {
      throw new BadRequestException({ key: 'errors.user_already_exist' });
    }

    await this.userRepository.insert({
      email,
      password: await brcypt.hash(password, 10),
    });
  }

  async verifyUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user || !brcypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({ key: 'errors.invalid_user_credentials' });
    }

    return omit(user, 'password');
  }
}
