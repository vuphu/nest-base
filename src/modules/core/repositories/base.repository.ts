import { FindConditions, Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
  async isExists(conditions?: FindConditions<T>): Promise<boolean> {
    const count = await this.count(conditions);
    return count > 0;
  }
}
