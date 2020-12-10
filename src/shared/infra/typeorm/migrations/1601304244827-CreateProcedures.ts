import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProcedures1601304244827
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_Ocorrencia',
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
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'datetime2',
            default: 'getDate()',
          },
        ],
        foreignKeys: [
          {
            name: 'procedure-company',
            referencedTableName: 'tb_Companies',
            referencedColumnNames: ['id'],
            columnNames: ['companyId'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_Ocorrencia');
  }
}
