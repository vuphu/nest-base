import { BaseModel } from '../models';
import { PaginateCollection, PaginateOptions } from '../types';
import { EntityManager, EntityTarget, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseRepository<T extends BaseModel> extends Repository<T> {
  constructor(target: EntityTarget<T>, manager: EntityManager) {
    super(target, manager);
  }

  async createOne(partialEntity: QueryDeepPartialEntity<T>): Promise<T> {
    const insertResult = await this.insert(partialEntity);
    return this.findOneBy({ id: insertResult.identifiers[0].id });
  }

  async paginate(options: FindOneOptions<T>, params: PaginateOptions): Promise<PaginateCollection<T>> {
    const { page = 1, limit = 50 } = params;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      await this.find({ ...options, skip: Number(skip), take: Number(limit) }),
      this.count(options),
    ]);

    return { total, items, page, limit };
  }
}
