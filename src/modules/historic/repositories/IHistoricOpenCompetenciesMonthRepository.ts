import ICreateHistoricOpenCompetenciesMonthDTO from '@modules/historic/dtos/ICreateHistoricOpenCompetenciesMonthDTO';
import HistoricOpenCompetenciesMonth from '@modules/historic/infra/typeorm/entities/HistoricOpenCompetenciesMonth';

export default interface IHistoricOpenCompetenciesMonthRepository {
  findById(id: number): Promise<HistoricOpenCompetenciesMonth | undefined>;
  create(
    historicData: ICreateHistoricOpenCompetenciesMonthDTO,
  ): Promise<HistoricOpenCompetenciesMonth>;
  save(
    historic: HistoricOpenCompetenciesMonth,
  ): Promise<HistoricOpenCompetenciesMonth>;
}
