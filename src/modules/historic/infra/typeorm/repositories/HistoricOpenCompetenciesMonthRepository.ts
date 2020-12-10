import { getRepository, Repository } from 'typeorm';

import IHistoricOpenCompetenciesMonthRepository from '@modules/historic/repositories/IHistoricOpenCompetenciesMonthRepository';

import HistoricOpenCompetenciesMonth from '@modules/historic/infra/typeorm/entities/HistoricOpenCompetenciesMonth';
import ICreateHistoricOpenCompetenciesMonthDTO from '@modules/historic/dtos/ICreateHistoricOpenCompetenciesMonthDTO';

export default class HistoricOpenCompetenciesMonthRepository
  implements IHistoricOpenCompetenciesMonthRepository {
  private ormRepository: Repository<HistoricOpenCompetenciesMonth>;

  constructor() {
    this.ormRepository = getRepository(HistoricOpenCompetenciesMonth);
  }

  public async findById(
    id: number,
  ): Promise<HistoricOpenCompetenciesMonth | undefined> {
    const historic = await this.ormRepository.findOne(id);
    return historic;
  }

  public async create(
    historicData: ICreateHistoricOpenCompetenciesMonthDTO,
  ): Promise<HistoricOpenCompetenciesMonth> {
    const historic = await this.ormRepository.create(historicData);
    await this.ormRepository.save(historic);

    return historic;
  }

  public async save(
    historic: HistoricOpenCompetenciesMonth,
  ): Promise<HistoricOpenCompetenciesMonth> {
    return this.ormRepository.save(historic);
  }
}
