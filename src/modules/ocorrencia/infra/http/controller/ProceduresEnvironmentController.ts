import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

export default class ProceduresEnvironmentController {
  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const procedures = await getConnection().query(`
        SELECT ENVIRONMENTS.id AS ID_AMBIENTE,
               ENVIRONMENTS.name AS AMBIENTE,
               PRO.id AS ID_PROCEDIMENTO,
               PRO.name AS PROCEDIMENTOS,
               PRO.image AS IMAGE
        FROM tb_EnvironmentsProcedures AS ENVPRO
        INNER JOIN tb_Environments AS ENVIRONMENTS ON ENVIRONMENTS.id = ENVPRO.environmentId
        INNER JOIN tb_Procedures AS PRO ON PRO.id = ENVPRO.procedureId
        WHERE ENVIRONMENTS.id = ${id}
    `);

    return response.status(200).json(procedures);
  }
}
