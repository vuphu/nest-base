import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1653753770949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'character varying',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'username',
            type: 'character varying',
          },
          {
            name: 'password',
            type: 'character varying',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
