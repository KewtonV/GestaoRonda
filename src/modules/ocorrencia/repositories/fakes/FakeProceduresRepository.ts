import ICreateProceduresDTO from '@modules/procedures/dtos/ICreateProceduresDTO';
import IProcedureRepository from '@modules/procedures/repositories/IProcedureRepository';

import Procedures from '@modules/procedures/infra/typeorm/entities/Procedures';

export default class ProceduresRepository implements IProcedureRepository {
  private procedures: Procedures[] = [];

  public async findById(id: number): Promise<Procedures | undefined> {
    const procedure = this.procedures.find(procedure => procedure.id === id);
    return procedure;
  }

  public async create(userData: ICreateProceduresDTO): Promise<Procedures> {
    const procedures = new Procedures();
    Object.assign(procedures, { id: 1 }, userData);
    this.procedures.push(procedures);
    return procedures;
  }

  public async save(procedure: Procedures): Promise<Procedures> {
    const findIndex = this.procedures.findIndex(
      findeProcedure => findeProcedure.id === procedure.id,
    );
    this.procedures[findIndex] = procedure;
    return procedure;
  }
}
