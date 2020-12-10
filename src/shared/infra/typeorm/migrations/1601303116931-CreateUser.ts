import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1601303116931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_Users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'dataNascimento',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
          },
          {
            name: 'telefone',
            type: 'varchar',
          },
          {
            name: 'companyId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ativo',
            type: 'int',
            default: '1',
          },
          {
            name: 'coordenador',
            type: 'int',
            default: '0',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tipo',
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
        foreignKeys: [
          {
            name: 'user-companies',
            referencedTableName: 'tb_Companies',
            referencedColumnNames: ['id'],
            columnNames: ['companyId'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_Users');
  }
}
