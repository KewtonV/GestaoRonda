import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCompanies1601302433754
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_Companies',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'Neighborhood',
            type: 'varchar',
          },
          {
            name: 'city ',
            type: 'varchar',
          },
          {
            name: 'centroCusto',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'longitude ',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'datetime2',
            default: 'getDate()',
          },
          {
            name: 'updatedAt',
            type: 'datetime2',
            default: 'getDate()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_Companies');
  }
}
