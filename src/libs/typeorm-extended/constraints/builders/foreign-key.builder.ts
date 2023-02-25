import { ConstraintBuilder } from './constraint.builder';
import { isArray, isEmpty } from 'lodash';
import { QueryRunner, TableForeignKey, TableForeignKeyOptions } from 'typeorm';

export class ForeignKeyBuilder extends ConstraintBuilder {
  private options: Partial<TableForeignKeyOptions> = {
    onUpdate: 'cascade',
    onDelete: 'cascade',
  };

  column(columnName: string | string[]): ForeignKeyBuilder {
    this.options.columnNames = isArray(columnName) ? columnName : [columnName];
    return this;
  }

  reference(table: string, columnName: string | string[]): ForeignKeyBuilder {
    this.options.referencedTableName = table;
    this.options.referencedColumnNames = isArray(columnName) ? columnName : [columnName];
    return this;
  }

  onDelete(strategy: string): ForeignKeyBuilder {
    this.options.onDelete = strategy;
    return this;
  }

  onUpdate(strategy: string): ForeignKeyBuilder {
    this.options.onUpdate = strategy;
    return this;
  }

  async commit(queryBuilder: QueryRunner): Promise<void> {
    const { columnNames, referencedTableName, referencedColumnNames } = this.options;

    this.throwIf(() => isEmpty(columnNames) || isEmpty(referencedColumnNames) || isEmpty(referencedColumnNames));

    await queryBuilder.createForeignKey(
      this.table,
      new TableForeignKey({
        name: `FK_${this.table}_${referencedTableName}`,
        columnNames,
        referencedTableName,
        referencedColumnNames,
        ...this.options,
      }),
    );
  }
}
