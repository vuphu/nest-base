import { TransactionHost } from '@nestjs-cls/transactional';
import { BaseModel } from '../models';
import { PaginateCollection, PaginateOptions } from '../types';
import { EntityManager, EntityTarget, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';

export class BaseRepository<T extends BaseModel> extends Repository<T> {
  constructor(
    private txHost: TransactionHost<TransactionalAdapterTypeOrm>,
    target: EntityTarget<T>,
  ) {
    super(target, txHost.tx);
  }

  async createOne(partialEntity: QueryDeepPartialEntity<T>): Promise<T> {
    const insertResult = await this.insert(partialEntity);
    return this.findOneBy({ id: insertResult.identifiers[0].id });
  }

  async paginate(options: FindOneOptions<T>, params: PaginateOptions): Promise<PaginateCollection<T>> {
    const { page = 1, limit = 50 } = params;
    const skip = (page - 1) * limit;

    const [items, totalCount] = await Promise.all([
      await this.find({ ...options, skip: Number(skip), take: Number(limit) }),
      this.count(options),
    ]);

    return { totalCount, items, page, limit };
  }
}

// Override entity manager
Object.defineProperty(BaseRepository.prototype, 'manager', {
  get() {
    return this.txHost.tx.getRepository(this._target).manager;
  },
  set(manager: EntityManager | undefined) {
    this._manager = manager;
  },
});
