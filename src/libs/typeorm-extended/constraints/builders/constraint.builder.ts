import { QueryRunner } from 'typeorm';

export abstract class ConstraintBuilder {
  constructor(protected table: string) {}

  abstract commit(queryBuilder: QueryRunner): Promise<void>;

  protected throwIf(where: () => boolean): void {
    if (where()) {
      throw new Error('The constraint is wrong');
    }
  }
}
