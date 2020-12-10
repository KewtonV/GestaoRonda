import Environments from '@modules/environments/infra/typeorm/entities/Environments';
import ICreateEnvironmentsDTO from '@modules/environments/dtos/ICreateEnvironmentsDTO';
import ICreateEnrionmentsProcedureDTO from '@modules/environments/dtos/ICreateEnrionmentsProcedureDTO';

export default interface IEnvironmentsRepository {
  findById(id: string): Promise<Environments | undefined>;
  create(userData: ICreateEnvironmentsDTO): Promise<Environments>;
  createProcedure(userData: ICreateEnrionmentsProcedureDTO): Promise<void>;
  updateProcedure(userData: ICreateEnrionmentsProcedureDTO): Promise<void>;
  save(user: Environments): Promise<Environments>;
}
