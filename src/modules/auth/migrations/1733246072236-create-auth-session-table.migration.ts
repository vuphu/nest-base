import { ColumnGenerator } from '@/add-ons/typeorm';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateAuthSessionTable1733246072236 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_sessions',
        columns: [
          ColumnGenerator.primaryUUID(),
          ColumnGenerator.builder().uuid('user_id').make(),
          ColumnGenerator.builder().timestamp('issued_at').default('now()').make(),
          ColumnGenerator.createdAt(),
          ColumnGenerator.updatedAt(),
          ColumnGenerator.deletedAt(),
        ],
      }),
    );

    await queryRunner.createIndex('auth_sessions', new TableIndex({ columnNames: ['user_id'] }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('auth_sessions');
  }
}
