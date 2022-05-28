import { BaseRepository } from 'src/modules/core/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { User } from '../models/user.model';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
