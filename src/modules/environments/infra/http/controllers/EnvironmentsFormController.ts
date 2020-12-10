import { Request, Response } from 'express';

import { getConnection } from 'typeorm';

export default class EnvironmentsFormController {
  async form(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const setores = await getConnection().query(`
      SELECT SETOR.id AS ID_SETOR,
             SETOR.name AS NAME_SETOR
      FROM tb_Setor AS SETOR
      WHERE SETOR.companyId = ${id}`);

    const ocorrencia = await getConnection().query(`
      SELECT PROCEDIMENTOS.id AS ID_OCORRENCIA,
            PROCEDIMENTOS.name AS NAME_OCORRENCIA
      FROM tb_Ocorrencia AS PROCEDIMENTOS
      WHERE PROCEDIMENTOS.companyId = ${id}
    `);

    return response.status(200).json({ setores, ocorrencia });
  }
}
