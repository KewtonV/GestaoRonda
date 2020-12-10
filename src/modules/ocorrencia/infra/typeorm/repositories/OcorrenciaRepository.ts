import { getRepository, Repository } from 'typeorm';

import ICreateProceduresDTO from '@modules/ocorrencia/dtos/ICreateOcorrenciaDTO';
import IProcedureRepository from '@modules/ocorrencia/repositories/IOcorrenciaRepository';

import Procedures from '@modules/ocorrencia/infra/typeorm/entities/Ocorrencia';

export default class ProceduresRepository implements IProcedureRepository {
  private ormRepository: Repository<Procedures>;

  constructor() {
    this.ormRepository = getRepository(Procedures);
  }

  public async findById(id: number): Promise<Procedures | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async create(
    procedureData: ICreateProceduresDTO,
  ): Promise<Procedures> {
    const procedure = this.ormRepository.create(procedureData);

    await this.ormRepository.save(procedure);

    return procedure;
  }

  public async save(procedure: Procedures): Promise<Procedures> {
    return this.ormRepository.save(procedure);
  }
}
