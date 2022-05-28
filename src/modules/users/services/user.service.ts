import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import * as brcypt from 'bcrypt';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
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
      throw new BadRequestException('User already exists');
    }

    await this.userRepository.insert({
      username,
      password: await brcypt.hash(password, 10),
    });
  }

  async verifyUser(username: string, password: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ username });

    if (!user || !brcypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('User credentials is not valid');
    }

    return omit(user, 'password');
  }
}
