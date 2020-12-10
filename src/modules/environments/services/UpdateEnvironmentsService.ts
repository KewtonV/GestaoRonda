import { inject, injectable } from 'tsyringe';

import RequestUpdateEnvironmentsService from '@modules/environments/services/interface/RequestUpdateEnvironmentsService';
import AppError from '@shared/errors/AppError';

import IEnvironmentsRepository from '@modules/environments/repositories/IEnvironmentsRepository';
import Environment from '../infra/typeorm/entities/Environments';

@injectable()
export default class UpdateEnvironmentService {
  constructor(
    @inject('EnvironmentsRepository')
    private enviromentsRepository: IEnvironmentsRepository,
  ) {}

  public async execute({
    environmentId,
    name,
    ocorrencia,
  }: RequestUpdateEnvironmentsService): Promise<Environment> {
    const id = environmentId;

    const environment = await this.enviromentsRepository.findById(
      id.toString(),
    );

    if (!environment) {
      throw new AppError('Environment not found.');
    }

    if (name && environment.name !== name) {
      environment.name = name;
    }

    if (ocorrencia) {
      await this.enviromentsRepository.updateProcedure({
        environmentId,
        ocorrencia,
      });
    }

    await this.enviromentsRepository.save(environment);

    return environment;
  }
}
