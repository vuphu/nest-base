import { ColumnGenerator } from '@/libs/typeorm-extended/columns';
import { ConstraintGenerator } from '@/libs/typeorm-extended/constraints';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1653753770949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          ColumnGenerator.primaryUUID(),
          ColumnGenerator.builder().string('username').make(),
          ColumnGenerator.builder().string('password').make(),
          ColumnGenerator.createdAt(),
          ColumnGenerator.updatedAt(),
          ColumnGenerator.deletedAt(),
        ],
      }),
    );

    await ConstraintGenerator.index('users').column('username').commit(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
