import { ColumnGenerator } from '@/add-ons/typeorm-extension';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUserTable1653753770949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          ColumnGenerator.primaryUUID(),
          ColumnGenerator.builder().string('email').make(),
          ColumnGenerator.builder().string('password').make(),
          ColumnGenerator.builder().string('first_name').nullable().make(),
          ColumnGenerator.builder().string('last_name').nullable().make(),
          ColumnGenerator.createdAt(),
          ColumnGenerator.updatedAt(),
          ColumnGenerator.deletedAt(),
        ],
      }),
    );

    await queryRunner.createIndex('users', new TableIndex({ columnNames: ['email'] }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
