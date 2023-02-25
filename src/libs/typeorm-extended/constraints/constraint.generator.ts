import { ForeignKeyBuilder, IndexBuilder } from './builders';

export class ConstraintGenerator {
  static index(table: string): IndexBuilder {
    return new IndexBuilder(table);
  }

  static foreign(table: string): ForeignKeyBuilder {
    return new ForeignKeyBuilder(table);
  }
}
