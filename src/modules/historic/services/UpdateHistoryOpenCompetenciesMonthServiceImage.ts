import { inject, injectable } from 'tsyringe';

import StorageProvider from '@shared/container/providers/StorageProvider/model/StorageProvider';
import IHistoricOpenCompetenciesMonthRepository from '@modules/historic/repositories/IHistoricOpenCompetenciesMonthRepository';
import RequestUpdateHistoricOpenCompetenciesMonthImageService from './interface/RequestUpdateHistoricOpenCompetenciesMonthImageService';
import HistoricOpenCompetenciesMonth from '../infra/typeorm/entities/HistoricOpenCompetenciesMonth';

@injectable()
export default class UpdateHistoricOpenCompetenciesMonthImageService {
  constructor(
    @inject('HistoricOpenCompetenciesMonthRepository')
    private historicOpenCompetenciesMonthRepository: IHistoricOpenCompetenciesMonthRepository,

    @inject('DiskStorageProvider')
    private storageProvider: StorageProvider,
  ) {}

  public async execute({
    historicId,
    historicFileName,
  }: RequestUpdateHistoricOpenCompetenciesMonthImageService): Promise<
    HistoricOpenCompetenciesMonth
  > {
    const id: number = +historicId;
    const historic = await this.historicOpenCompetenciesMonthRepository.findById(
      id,
    );

    if (historic.image) {
      await this.storageProvider.deleteFileProcedures(historic.image);
    }
    const filename = await this.storageProvider.saveFileProcedures(
      historicFileName,
    );
    historic.image = filename;

    await this.historicOpenCompetenciesMonthRepository.save(historic);

    return historic;
  }
}
