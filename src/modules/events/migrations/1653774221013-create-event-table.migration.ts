import { ColumnGenerator } from '@/add-ons/typeorm';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateEventTable1653774221013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          ColumnGenerator.primaryUUID(),
          ColumnGenerator.builder().uuid('user_id').make(),
          ColumnGenerator.builder().string('name').make(),
          ColumnGenerator.builder().string('description').nullable().make(),
          ColumnGenerator.builder().timestamp('start_date').make(),
          ColumnGenerator.builder().timestamp('due_date').make(),
          ColumnGenerator.createdAt(),
          ColumnGenerator.updatedAt(),
          ColumnGenerator.deletedAt(),
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'events',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('events');
  }
}
