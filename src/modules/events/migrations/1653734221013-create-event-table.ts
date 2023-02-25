import { ColumnGenerator } from '@/libs/typeorm-extended/columns';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEventTable1653734221013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          ColumnGenerator.primaryUUID(),
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('events');
  }
}
