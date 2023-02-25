import { TableColumnTypeBuilder } from './builders/table-column-builder';
import { TableColumnOptions } from 'typeorm';

export class ColumnGenerator {
  static createdAt(): TableColumnOptions {
    return this.builder().timestamp('created_at').default('now()').make();
  }

  static updatedAt(): TableColumnOptions {
    return this.builder().timestamp('updated_at').default('now()').make();
  }

  static deletedAt(): TableColumnOptions {
    return this.builder().timestamp('deleted_at').nullable().make();
  }

  static primaryUUID(): TableColumnOptions {
    return this.builder().uuid('id').primary().default('gen_random_uuid()').make();
  }

  static builder(): TableColumnTypeBuilder {
    return new TableColumnTypeBuilder();
  }
}
