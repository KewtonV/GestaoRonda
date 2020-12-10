import { getRepository, getConnection, Repository } from 'typeorm';

import ICreateEnvironmentsDTO from '@modules/environments/dtos/ICreateEnvironmentsDTO';
import ICreateEnrionmentsProcedureDTO from '@modules/environments/dtos/ICreateEnrionmentsProcedureDTO';
import IEnvironmentsRepository from '@modules/environments/repositories/IEnvironmentsRepository';

import Environments from '@modules/environments/infra/typeorm/entities/Environments';

export default class EnvironmentsRepository implements IEnvironmentsRepository {
  private ormRepository: Repository<Environments>;

  constructor() {
    this.ormRepository = getRepository(Environments);
  }

  public async findById(id: string): Promise<Environments | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async create(userData: ICreateEnvironmentsDTO): Promise<Environments> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async createProcedure(
    userData: ICreateEnrionmentsProcedureDTO,
  ): Promise<void> {
    userData.ocorrencia.map(async procedure => {
      await getConnection().query(`
        INSERT INTO tb_EnvironmentsOcorrencia(environmentId, ocorrenciaId)
        VALUES (${userData.environmentId}, ${procedure})
      `);
    });
  }

  public async updateProcedure(
    userData: ICreateEnrionmentsProcedureDTO,
  ): Promise<void> {
    await getConnection().query(`
      DELETE tb_EnvironmentsOcorrencia WHERE environmentId = ${userData.environmentId}
    `);
    userData.ocorrencia.map(async procedure => {
      await getConnection().query(`
        INSERT INTO tb_EnvironmentsOcorrencia(environmentId, ocorrenciaId)
        VALUES (${userData.environmentId}, ${procedure})
      `);
    });
  }

  public async save(environments: Environments): Promise<Environments> {
    return this.ormRepository.save(environments);
  }
}
