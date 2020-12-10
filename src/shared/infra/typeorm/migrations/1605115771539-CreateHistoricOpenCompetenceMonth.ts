import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateHistoricOpenCompetenceMonth1605115771539
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_HistoricOpenCompetenciesMonth',
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
            name: 'user-historic',
            referencedTableName: 'tb_Users',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
          },
          {
            name: 'environments-historic',
            referencedTableName: 'tb_Environments',
            referencedColumnNames: ['id'],
            columnNames: ['environmentId'],
          },
          {
            name: 'ocorrencia-historic',
            referencedTableName: 'tb_Ocorrencia',
            referencedColumnNames: ['id'],
            columnNames: ['ocorrenciaId'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_HistoricOpenCompetenciesMonth');
  }
}
