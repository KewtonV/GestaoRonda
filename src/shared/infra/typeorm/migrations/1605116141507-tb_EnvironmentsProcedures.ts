import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class tbEnvironmentsProcedures1605116141507
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_EnvironmentsOcorrencia',
        columns: [
          {
            name: 'environmentId',
            type: 'int',
          },
          {
            name: 'ocorrenciaId',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            name: 'environments-EnvironmentsOcorrencia',
            referencedTableName: 'tb_Environments',
            referencedColumnNames: ['id'],
            columnNames: ['environmentId'],
          },
          {
            name: 'ocorrencia-EnvironmentsOcorrencia',
            referencedTableName: 'tb_Ocorrencia',
            referencedColumnNames: ['id'],
            columnNames: ['ocorrenciaId'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_EnvironmentsProcedures');
  }
}
