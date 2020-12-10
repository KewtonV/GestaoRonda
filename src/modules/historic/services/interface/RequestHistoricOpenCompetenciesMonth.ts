export default interface RequestHistoricOpenCompetenciesMonthService {
  userId: number[];
  environmentId: number[];
  ocorrenciaId?: number[];
  observacao?: string[];
  createdAt: string[];
  updatedAt: string[];
  historicFileName: any;
}
