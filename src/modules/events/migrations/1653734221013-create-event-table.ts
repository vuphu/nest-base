import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEventTable1653734221013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          {
            name: 'id',
            type: 'character varying',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'name',
            type: 'character varying',
          },
          {
            name: 'start_date',
            type: 'date',
          },
          {
            name: 'due_date',
            type: 'date',
          },
          {
            name: 'description',
            type: 'character varying',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('events');
  }
}
