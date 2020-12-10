import ICreateEnvironmentsDTO from '@modules/environments/dtos/ICreateEnvironmentsDTO';
import ICreateEnvironmentsRiscoDTO from '@modules/environments/dtos/ICreateEnvironmentsRiscoDTO';
import ICreateEnrionmentsProcedureDTO from '@modules/environments/dtos/ICreateEnrionmentsProcedureDTO';
import IEnvironmentsRepository from '@modules/environments/repositories/IEnvironmentsRepository';

import Environments from '@modules/environments/infra/typeorm/entities/Environments';

export default class EnvironmentsRepository implements IEnvironmentsRepository {
  private enviroments: Environments[] = [];

  private environmentsRiscos: any[] = [];

  private environmentsProcedures: any[] = [];

  public async findById(id: string): Promise<Environments | undefined> {
    const enviroment = this.enviroments.find(
      enviroment => enviroment.id.toString() === id,
    );
    return enviroment;
  }

  public async create(userData: ICreateEnvironmentsDTO): Promise<Environments> {
    const enviroment = new Environments();
    Object.assign(enviroment, { id: 1 }, userData);
    this.enviroments.push(enviroment);
    return enviroment;
  }

  public async createRisco(
    userData: ICreateEnvironmentsRiscoDTO,
  ): Promise<void> {
    this.environmentsRiscos.push(userData);
  }

  public async createProcedure(
    userData: ICreateEnrionmentsProcedureDTO,
  ): Promise<void> {
    this.environmentsProcedures.push(userData);
  }

  public async save(environment: Environments): Promise<Environments> {
    const findIndex = this.enviroments.findIndex(
      findeEnvironment => findeEnvironment.id === environment.id,
    );
    this.enviroments[findIndex] = environment;
    return environment;
  }
}
