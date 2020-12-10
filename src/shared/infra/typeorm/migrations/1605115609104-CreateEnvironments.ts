import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEnvironments1605115609104
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_Environments',
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
            name: 'companyId',
            type: 'int',
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
        foreignKeys: [
          {
            name: 'enviroments-company',
            referencedTableName: 'tb_Companies',
            referencedColumnNames: ['id'],
            columnNames: ['companyId'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_Environments');
  }
}
