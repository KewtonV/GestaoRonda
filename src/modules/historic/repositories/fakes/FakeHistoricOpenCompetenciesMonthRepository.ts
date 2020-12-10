import IHistoricOpenCompetenciesMonthRepository from '@modules/historic/repositories/IHistoricOpenCompetenciesMonthRepository';

import ICreateHistoricOpenCompetenciesMonthDTO from '@modules/historic/dtos/ICreateHistoricOpenCompetenciesMonthDTO';
import HistoricOpenCompetenciesMonth from '@modules/historic/infra/typeorm/entities/HistoricOpenCompetenciesMonth';

export default class HistoricOpenCompetenciesMonthRepository
  implements IHistoricOpenCompetenciesMonthRepository {
  private historics: HistoricOpenCompetenciesMonth[] = [];

  public async findById(
    id: number,
  ): Promise<HistoricOpenCompetenciesMonth | undefined> {
    const procedure = this.historics.find(procedure => procedure.id === id);
    return procedure;
  }

  public async create(
    hisotoricData: ICreateHistoricOpenCompetenciesMonthDTO,
  ): Promise<HistoricOpenCompetenciesMonth> {
    const historic = new HistoricOpenCompetenciesMonth();
    Object.assign(historic, { id: 1 }, hisotoricData);
    this.historics.push(historic);
    return historic;
  }

  public async save(
    historic: HistoricOpenCompetenciesMonth,
  ): Promise<HistoricOpenCompetenciesMonth> {
    const findIndex = this.historics.findIndex(
      findHistoric => findHistoric.id === historic.id,
    );
    this.historics[findIndex] = historic;
    return historic;
  }
}
