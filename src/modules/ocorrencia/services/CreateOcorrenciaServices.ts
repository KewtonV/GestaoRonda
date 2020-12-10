import { injectable, inject } from 'tsyringe';

import Procedures from '@modules/ocorrencia/infra/typeorm/entities/Ocorrencia';
import RequestCreateProcedures from '@modules/ocorrencia/services/intefaces/RequestCreateOcorrencia';
import IProcedureRepository from '@modules/ocorrencia/repositories/IOcorrenciaRepository';

@injectable()
export default class CreateProcedureService {
  constructor(
    @inject('ProcedureRepository')
    private procedureRepository: IProcedureRepository,
  ) {}

  public async execute({
    name,
    companyId,
  }: RequestCreateProcedures): Promise<Procedures> {
    const userData = {
      name,
      companyId,
    };
    const user = await this.procedureRepository.create(userData);
    return user;
  }
}
