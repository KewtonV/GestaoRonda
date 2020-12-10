import { inject, injectable } from 'tsyringe';

import RequestUpdateProcedures from '@modules/ocorrencia/services/intefaces/RequestUpdateOcorrencia';
import AppError from '@shared/errors/AppError';

import IProcedureRepository from '@modules/ocorrencia/repositories/IOcorrenciaRepository';
import Procedures from '@modules/ocorrencia/infra/typeorm/entities/Ocorrencia';

@injectable()
export default class UpdateProcedureService {
  constructor(
    @inject('ProcedureRepository')
    private procedureRepository: IProcedureRepository,
  ) {}

  public async execute({
    procudureId,
    name,
  }: RequestUpdateProcedures): Promise<Procedures> {
    const id = procudureId;

    const procedure = await this.procedureRepository.findById(id);

    if (!procedure) {
      throw new AppError('Procedure not found.');
    }

    procedure.name = name;

    await this.procedureRepository.save(procedure);

    return procedure;
  }
}
