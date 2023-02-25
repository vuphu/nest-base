import { ConstraintBuilder } from './constraint.builder';
import { QueryRunner, TableIndex } from 'typeorm';
import { isArray, isEmpty } from 'lodash';

export class IndexBuilder extends ConstraintBuilder {
  private columnNames: string[];

  column(columnName: string | string[]): IndexBuilder {
    this.columnNames = isArray(columnName) ? columnName : [columnName];
    return this;
  }

  async commit(queryBuilder: QueryRunner): Promise<void> {
    const { columnNames } = this;

    this.throwIf(() => isEmpty(columnNames));

    const name = `IX_${this.table}_${columnNames.join('_')}`;
    await queryBuilder.createIndex(this.table, new TableIndex({ name, columnNames }));
  }
}
