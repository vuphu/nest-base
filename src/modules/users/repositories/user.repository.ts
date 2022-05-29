import { User } from '../models';
import { BaseRepository } from '@/modules/core';
import { EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
