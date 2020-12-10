import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProceduresServices from '@modules/ocorrencia/services/CreateOcorrenciaServices';
import UpdateProceduresService from '@modules/ocorrencia/services/UpdateOcorrenciaService';
import Procedures from '@modules/ocorrencia/infra/typeorm/entities/Ocorrencia';
import { getRepository } from 'typeorm';

export default class ProcedureController {
  async index(request: Request, response: Response): Promise<Response> {
    const proceduresRepository = getRepository(Procedures);
    const procedures = await proceduresRepository.find({
      where: { companyId: request.query.id },
    });

    return response.status(200).json(procedures);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, companyId } = request.body;
    const createprocedures = container.resolve(CreateProceduresServices);
    const procedure = await createprocedures.execute({
      name,
      companyId,
    });

    delete procedure.createdAt;
    delete procedure.updatedAt;

    return response.json(procedure);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const proceduresRepository = getRepository(Procedures);
    const procedure = await proceduresRepository.findOne(id);
    return response.status(200).json(procedure);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;
    const updateUser = container.resolve(UpdateProceduresService);
    const procedure = await updateUser.execute({
      procudureId: Number(id),
      name,
    });

    delete procedure.createdAt;
    delete procedure.updatedAt;

    return response.status(200).json(procedure);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const proceduresRepository = getRepository(Procedures);
    const procedure = await proceduresRepository.findOne(id);
    await proceduresRepository.remove(procedure);
    return response
      .status(200)
      .json({ message: 'Procedure successfully deleted' });
  }
}
