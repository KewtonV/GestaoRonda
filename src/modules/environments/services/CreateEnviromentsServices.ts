import { injectable, inject } from 'tsyringe';

import Environments from '@modules/environments/infra/typeorm/entities/Environments';
import RequestCreateEnviroments from '@modules/environments/services/interface/RequestCreateEnviroments';
import IEnvironmentsRepository from '@modules/environments/repositories/IEnvironmentsRepository';

@injectable()
export default class CreateEnviromentsService {
  constructor(
    @inject('EnvironmentsRepository')
    private enviromentsRepository: IEnvironmentsRepository,
  ) {}

  public async execute({
    name,
    companyId,
    ocorrencia,
  }: RequestCreateEnviroments): Promise<Environments> {
    const environmentsData = {
      name,
      companyId,
    };
    const environment = await this.enviromentsRepository.create(
      environmentsData,
    );

    await this.enviromentsRepository.createProcedure({
      environmentId: environment.id,
      ocorrencia,
    });

    return environment;
  }
}
