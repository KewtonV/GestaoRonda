export default interface ICreateHistoricOpenCompetenciesMonthDTO {
  userId: number;
  environmentId: number;
  ocorrenciaId: number;
  observacao?: string;
  createdAt: string;
  updatedAt: string;
}
