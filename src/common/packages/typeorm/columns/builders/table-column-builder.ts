import { TableColumnOptions } from 'typeorm';

export class TableColumnTypeBuilder {
  string(name: string): TableColumnBuilder {
    return new TableColumnBuilder(name, 'character varying');
  }

  i32(name: string): TableColumnBuilder {
    return new TableColumnBuilder(name, 'integer');
  }

  i64(name: string): TableColumnBuilder {
    return new TableColumnBuilder(name, 'bigint');
  }

  timestamp(name: string): TableColumnBuilder {
    return new TableColumnBuilder(name, 'timestamp');
  }

  uuid(name: string): TableColumnBuilder {
    return new TableColumnBuilder(name, 'uuid');
  }
}

export class TableColumnBuilder {
  private options: TableColumnOptions;

  constructor(name: string, type: string) {
    this.options = { name, type };
  }

  default(value: string): TableColumnBuilder {
    this.options.default = value;
    return this;
  }

  primary(): TableColumnBuilder {
    this.options.isPrimary = true;
    return this;
  }

  nullable(): TableColumnBuilder {
    this.options.isNullable = true;
    return this;
  }

  make(): TableColumnOptions {
    return this.options;
  }
}
