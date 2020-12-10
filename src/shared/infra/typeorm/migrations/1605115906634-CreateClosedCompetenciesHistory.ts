import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateClosedCompetenciesHistory1605115906634
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_ClosedCompetenciesHistory',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'environmentId',
            type: 'int',
          },
          {
            name: 'ocorrenciaId',
            type: 'int',
          },
          {
            name: 'observacao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'datetime2',
          },
          {
            name: 'updatedAt',
            type: 'datetime2',
          },
        ],
        foreignKeys: [
          {
            name: 'user-closedHistory',
            referencedTableName: 'tb_Users',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
          },
          {
            name: 'environments-closedHistory',
            referencedTableName: 'tb_Environments',
            referencedColumnNames: ['id'],
            columnNames: ['environmentId'],
          },
          {
            name: 'ocorrencia-closedHistoric',
            referencedTableName: 'tb_Ocorrencia',
            referencedColumnNames: ['id'],
            columnNames: ['ocorrenciaId'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_ClosedCompetenciesHistory');
  }
}
