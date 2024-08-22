import { User } from '../models';
import { UserRepository } from '../repositories';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as brcypt from 'bcrypt';
import { isNil, omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findUserById(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ id: userId });
  }

  async createUser(partialUser: Partial<User>): Promise<void> {
    const { email, password } = partialUser;

    const isEmailUsed = await this.userRepository.exists({ where: { email } });
    if (isEmailUsed) {
      throw new BadRequestException({ key: 'errors.modules.users.email_already_in_use' });
    }

    await this.userRepository.insert({
      ...partialUser,
      password: await brcypt.hash(password, 10),
    });
  }

  async verifyUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .getOne();

    if (isNil(user) || !brcypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({ key: 'errors.modules.users.invalid_credentials' });
    }

    return omit(user, 'password');
  }
}
