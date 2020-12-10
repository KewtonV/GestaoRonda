import Procedures from '@modules/ocorrencia/infra/typeorm/entities/Ocorrencia';
import ICreateProceduresDTO from '@modules/ocorrencia/dtos/ICreateOcorrenciaDTO';

export default interface IProcedureRepository {
  findById(id: number): Promise<Procedures | undefined>;
  create(procedureData: ICreateProceduresDTO): Promise<Procedures>;
  save(procedure: Procedures): Promise<Procedures>;
}
