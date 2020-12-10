import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository, getConnection } from 'typeorm';

import CreateEnviromentsServices from '@modules/environments/services/CreateEnviromentsServices';
import UpdateUserService from '@modules/environments/services/UpdateEnvironmentsService';
import Environment from '@modules/environments/infra/typeorm/entities/Environments';

export default class EnvironmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const environments = await getConnection().query(`
      SELECT AMBIENTE.id AS ID,
          AMBIENTE.name AS AMBIENTE_NOME,
          EMPRESA.name AS EMPRESA,
          OCORRENCIA.name AS name_ocorrencia
      FROM tb_Environments AS AMBIENTE
      INNER JOIN tb_EnvironmentsOcorrencia AS ENVOCO ON ENVOCO.environmentId = AMBIENTE.id
      INNER JOIN tb_Ocorrencia AS OCORRENCIA ON OCORRENCIA.id = ENVOCO.ocorrenciaId
      INNER JOIN tb_Companies AS EMPRESA ON EMPRESA.id = AMBIENTE.companyId
      WHERE AMBIENTE.companyId = ${id}
      GROUP BY AMBIENTE.id,
				AMBIENTE.name,
				EMPRESA.name,
				OCORRENCIA.name
    `);
    const result: any = [];

    const dealt = async (environment: any) => {
      const findIndex = result.findIndex(
        (findEnvironmet: any) => findEnvironmet.ID === environment.ID,
      );

      if (findIndex === -1) {
        result.push(environment);
        const index = result.findIndex(
          (findEnvironmet: any) => findEnvironmet.ID === environment.ID,
        );
        result[index].OCORRENCIAS = [];
        result[index].OCORRENCIAS.push(environment.name_ocorrencia);
        delete result[index].name_ocorrencia;
        return environment;
      }
      if (findIndex === 0) {
        if (
          !(
            result[findIndex].OCORRENCIAS.indexOf(environment.name_ocorrencia) >
            -1
          )
        ) {
          result[findIndex].OCORRENCIAS.push(environment.name_ocorrencia);
        }
      } else if (findIndex > 0) {
        if (
          !(
            result[findIndex].OCORRENCIAS.indexOf(environment.name_ocorrencia) >
            -1
          )
        ) {
          result[findIndex].OCORRENCIAS.push(environment.name_ocorrencia);
        }
      }
      return result;
    };

    await environments.map(dealt);

    return response.status(200).json(result);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, companyId, ocorrencia } = request.body;
    const createEnviroments = container.resolve(CreateEnviromentsServices);
    const environment = await createEnviroments.execute({
      name,
      companyId,
      ocorrencia,
    });

    delete environment.createdAt;
    delete environment.updatedAt;

    return response.json(environment);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const environments = await getConnection().query(`
      SELECT AMBIENTE.id AS ID,
          AMBIENTE.name AS AMBIENTE_NOME,
          EMPRESA.name AS EMPRESA,
          OCORRENCIA.name AS name_ocorrencia
      FROM tb_Environments AS AMBIENTE
      INNER JOIN tb_EnvironmentsOcorrencia AS ENVOCO ON ENVOCO.environmentId = AMBIENTE.id
      INNER JOIN tb_Ocorrencia AS OCORRENCIA ON OCORRENCIA.id = ENVOCO.ocorrenciaId
      INNER JOIN tb_Companies AS EMPRESA ON EMPRESA.id = AMBIENTE.companyId
      WHERE AMBIENTE.id = ${id}
      GROUP BY AMBIENTE.id,
				AMBIENTE.name,
				EMPRESA.name,
				OCORRENCIA.name
    `);
    const ocorrencia = await getConnection().query(`
      SELECT ocorrencia.id, ocorrencia.name nome_ocorrencia FROM tb_Ocorrencia ocorrencia
      INNER JOIN tb_EnvironmentsOcorrencia ENVOCO ON ENVOCO.ocorrenciaId = ocorrencia.id
      WHERE ENVOCO.environmentId = ${id}
    `);
    const result: any = [];

    const dealt = async (environment: any) => {
      const findIndex = result.findIndex(
        (findEnvironmet: any) => findEnvironmet.ID === environment.ID,
      );

      if (findIndex === -1) {
        result.push(environment);
        const index = result.findIndex(
          (findEnvironmet: any) => findEnvironmet.ID === environment.ID,
        );
        result[index].OCORRENCIAS = [];
        result[index].OCORRENCIAS.push(environment.name_ocorrencia);
        delete result[index].name_ocorrencia;
        return environment;
      }
      if (findIndex === 0) {
        if (
          !(
            result[findIndex].OCORRENCIAS.indexOf(environment.name_ocorrencia) >
            -1
          )
        ) {
          result[findIndex].OCORRENCIAS.push(environment.name_ocorrencia);
        }
      } else if (findIndex > 0) {
        if (
          !(
            result[findIndex].OCORRENCIAS.indexOf(environment.name_ocorrencia) >
            -1
          )
        ) {
          result[findIndex].OCORRENCIAS.push(environment.name_ocorrencia);
        }
      }
      return result;
    };

    await environments.map(dealt);
    return response.status(200).json({ result, ocorrencia });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, ocorrencia } = request.body;
    const { id } = request.params;
    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({
      environmentId: Number(id),
      name,
      ocorrencia,
    });

    return response.status(200).json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    await getConnection().query(`
      DELETE tb_EnvironmentsOcorrencia
      WHERE environmentId = ${id}
    `);

    await getConnection().query(`
      DELETE tb_Environments
      WHERE id = ${id}
    `);
    return response
      .status(200)
      .json({ message: 'Environment successfully deleted' });
  }

  async form(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;
    const ocorrencia = await getConnection().query(`
      SELECT OCORRENCIA.id AS ID_OCORRENCIA,
          OCORRENCIA.name AS NAME_OCORRENCIA
      FROM tb_Ocorrencia AS OCORRENCIA
      WHERE OCORRENCIA.companyId = ${Number(id)}
    `);

    return response.status(200).json({ ocorrencia });
  }
}
