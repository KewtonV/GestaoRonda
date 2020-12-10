import { injectable, inject } from 'tsyringe';

import StorageProvider from '@shared/container/providers/StorageProvider/model/StorageProvider';
import IHistoricOpenCompetenciesMonthRepository from '@modules/historic/repositories/IHistoricOpenCompetenciesMonthRepository';
import RequestHistoricOpenCompetenciesMonthService from './interface/RequestHistoricOpenCompetenciesMonth';

@injectable()
export default class CreateHistoricOpenCompetenciesMonthService {
  constructor(
    @inject('HistoricOpenCompetenciesMonthRepository')
    private historicOpenCompetenciesMonthRepository: IHistoricOpenCompetenciesMonthRepository,

    @inject('DiskStorageProvider')
    private storageProvider: StorageProvider,
  ) {}

  public async execute({
    userId,
    environmentId,
    ocorrenciaId,
    observacao,
    createdAt,
    updatedAt,
    historicFileName,
  }: RequestHistoricOpenCompetenciesMonthService): Promise<string> {
    let history: any;

    for (let i = 0; i < userId.length; i++) {
      if (observacao[i] === '' && historicFileName[i] === undefined) {
        history = await this.historicOpenCompetenciesMonthRepository.create({
          userId,
          environmentId,
          ocorrenciaId,
          createdAt: String(createdAt),
          updatedAt: String(updatedAt),
        });
      } else if (userId.length === 1) {
        history = await this.historicOpenCompetenciesMonthRepository.create({
          userId,
          environmentId,
          ocorrenciaId,
          observacao,
          createdAt: String(createdAt),
          updatedAt: String(updatedAt),
        });

        const filename = await this.storageProvider.saveFileProcedures(
          historicFileName[i].filename,
        );
        history.image = filename;

        await this.historicOpenCompetenciesMonthRepository.save(history);
      } else {
        history = await this.historicOpenCompetenciesMonthRepository.create({
          userId: userId[i],
          environmentId: environmentId[i],
          ocorrenciaId: ocorrenciaId[i],
          observacao: observacao[i],
          createdAt: String(createdAt[i]),
          updatedAt: String(updatedAt[i]),
        });

        const filename = await this.storageProvider.saveFileProcedures(
          historicFileName[i].filename,
        );
        history.image = filename;

        await this.historicOpenCompetenciesMonthRepository.save(history);
      }
    }

    return 'History successfully registered';
  }
}
