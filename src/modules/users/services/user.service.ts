import { CreateUserDto } from '../dtos';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as brcypt from 'bcrypt';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  async createUser(dto: CreateUserDto): Promise<void> {
    const { username, password } = dto;

    const isExist = await this.userRepository.isExists({ username });
    if (isExist) {
      throw new BadRequestException({ key: 'errors.user_already_exist' });
    }

    await this.userRepository.insert({
      username,
      password: await brcypt.hash(password, 10),
    });
  }

  async verifyUser(username: string, password: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ username });

    if (!user || !brcypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({ key: 'errors.invalid_user_credentials' });
    }

    return omit(user, 'password');
  }
}
