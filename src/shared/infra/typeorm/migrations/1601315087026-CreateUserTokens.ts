import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserTokens1601315087026
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_UserTokens',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'active',
            type: 'int',
            default: 1,
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
            name: 'user-userToken',
            referencedTableName: 'tb_Users',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_UserTokens');
  }
}
