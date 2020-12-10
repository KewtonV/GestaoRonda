import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

export default class DashboardController {
  async index(request: Request, response: Response): Promise<Response> {
    const { companyId, dataInicio, dataFim } = request.query;

    const monthCurrent = new Date().getMonth();
    const monthInitialSearch = dataInicio.slice(5, 7);
    const monthFinalSearch = dataFim.slice(5, 7);

    let res: any[] = [];

    if (
      Number(monthInitialSearch) < monthCurrent + 1 &&
      Number(monthFinalSearch) < monthCurrent + 1
    ) {
      res = await getConnection().query(`
        SELECT ambiente.id id, ambiente.name nome FROM tb_Environments ambiente
        INNER JOIN tb_ClosedCompetenciesHistory historico ON historico.environmentId = ambiente.id
        WHERE ambiente.companyId = ${companyId}
              AND CONVERT(DATE,historico.createdAt,112) BETWEEN '${dataInicio}' AND '${dataFim}'
        GROUP BY ambiente.id, ambiente.name
        ORDER BY ambiente.id
      `);
    } else if (
      Number(monthInitialSearch) < monthCurrent + 1 &&
      Number(monthFinalSearch) === monthCurrent + 1
    ) {
      res = await getConnection().query(`
        SELECT ambiente.id id_ambiente,
              ambiente.name nome_ambiente,
              ocorrencia.id id_ocorrencia,
              ocorrencia.name name_ocorrencia
        FROM tb_Environments ambiente
          INNER JOIN tb_HistoricOpenCompetenciesMonth historico ON historico.environmentId = ambiente.id
          INNER JOIN tb_EnvironmentsOcorrencia AS ENVOCO ON ENVOCO.environmentId = AMBIENTE.id
          INNER JOIN tb_Ocorrencia AS ocorrencia ON ocorrencia.id = ENVOCO.ocorrenciaId
        WHERE ambiente.companyId = ${companyId}
          AND CONVERT(DATE,historico.createdAt,112) BETWEEN '${dataInicio}' AND '${dataFim}'
        GROUP BY  ambiente.id,
                  ambiente.name,
                  ocorrencia.id,
                  ocorrencia.name
        UNION
        SELECT ambiente.id id_ambiente,
              ambiente.name nome_ambiente,
              ocorrencia.id id_ocorrencia,
              ocorrencia.name name_ocorrencia
        FROM tb_Environments ambiente
          INNER JOIN tb_ClosedCompetenciesHistory historico ON historico.environmentId = ambiente.id
          INNER JOIN tb_EnvironmentsOcorrencia AS ENVOCO ON ENVOCO.environmentId = AMBIENTE.id
          INNER JOIN tb_Ocorrencia AS ocorrencia ON ocorrencia.id = ENVOCO.ocorrenciaId
        WHERE ambiente.companyId = ${companyId}
            AND CONVERT(DATE,historico.createdAt,112) BETWEEN '${dataInicio}' AND '${dataFim}'
        GROUP BY  ambiente.id,
                  ambiente.name,
                  ocorrencia.id,
                  ocorrencia.name
        ORDER BY ambiente.id;
      `);
    } else if (
      Number(monthInitialSearch) === monthCurrent + 1 &&
      Number(monthFinalSearch) === monthCurrent + 1
    ) {
      res = await getConnection().query(`
        SELECT ambiente.id id, ambiente.name nome FROM tb_Environments ambiente
        INNER JOIN tb_HistoricOpenCompetenciesMonth historico ON historico.environmentId = ambiente.id
        WHERE ambiente.companyId = ${companyId}
              AND CONVERT(DATE,historico.createdAt,112) BETWEEN '${dataInicio}' AND '${dataFim}'
        GROUP BY ambiente.id, ambiente.name
        ORDER BY ambiente.id
      `);
    } else {
      res.push('Intervalo de datas inválidos');
    }

    return response.status(200).json({ res });
  }

  async info(request: Request, response: Response): Promise<Response> {
    const { environmentId, dataInicio, dataFim } = request.query;

    const monthCurrent = new Date().getMonth();
    const monthInitialSearch = dataInicio.slice(5, 7);
    const monthFinalSearch = dataFim.slice(5, 7);

    const res: any[] = [];

    if (
      Number(monthInitialSearch) < monthCurrent + 1 &&
      Number(monthFinalSearch) < monthCurrent + 1
    ) {
      const data = await getConnection().query(`
        SELECT usuario.id id_usuario,
            usuario.nome nome_usuario,
            usuario.cpf cpf,
            usuario.email email_usuario,
            usuario.avatar avatar,
            usuario.telefone telefone,
            ocorrencia.name ocorrencia,
            historico.observacao observacao,
            historico.image imagem,
            historico.createdAt data
        FROM tb_ClosedCompetenciesHistory historico
        INNER JOIN tb_Environments ambiente ON ambiente.id = historico.environmentId
        INNER JOIN tb_Users usuario ON usuario.id = historico.userId
        INNER JOIN tb_Ocorrencia ocorrencia ON ocorrencia.id = historico.ocorrenciaId
        WHERE historico.environmentId = ${environmentId}
            AND CONVERT(DATE,historico.createdAt,112) BETWEEN '${dataInicio}' AND '${dataFim}'
      `);

      await data.map(async (historic: any) => {
        res.push({
          id_usuario: historic.id_usuario,
          nome_usuario: historic.nome_usuario,
          cpf_usuario: historic.cpf,
          email_usuario: historic.email_usuario,
          avatar: `https://app-qrseguranca-avatar.s3.amazonaws.com/${historic.avatar}`,
          telefone: historic.telefone,
          ocorrencia: historic.ocorrencia,
          observacao: historic.observacao,
          data: historic.data,
          imagem: `https://app-qrseguranca-ambiente.s3.amazonaws.com/${historic.imagem}`,
        });
        return historic;
      });
    } else if (
      Number(monthInitialSearch) < monthCurrent + 1 &&
      Number(monthFinalSearch) === monthCurrent + 1
    ) {
      const data = await getConnection().query(`
        SELECT usuario.id id_usuario,
            usuario.nome nome_usuario,
            usuario.cpf cpf,
            usuario.email email_usuario,
            usuario.avatar avatar,
            usuario.telefone telefone,
            ocorrencia.name ocorrencia,
            historico.observacao observacao,
            historico.image imagem,
            historico.createdAt data
        FROM tb_HistoricOpenCompetenciesMonth historico
        INNER JOIN tb_Environments ambiente ON ambiente.id = historico.environmentId
        INNER JOIN tb_Users usuario ON usuario.id = historico.userId
        INNER JOIN tb_Ocorrencia ocorrencia ON ocorrencia.id = historico.ocorrenciaId
        WHERE historico.environmentId = ${environmentId}
            AND CONVERT(DATE,historico.createdAt,112) BETWEEN DATEFROMPARTS(YEAR('${dataFim}'),MONTH('${dataFim}'),1) AND '${dataFim}'
        UNION
        SELECT usuario.id id_usuario,
            usuario.nome nome_usuario,
            usuario.cpf cpf,
            usuario.email email_usuario,
            usuario.avatar avatar,
            usuario.telefone telefone,
            ocorrencia.name ocorrencia,
            historico.observacao observacao,
            historico.image imagem,
            historico.createdAt data
        FROM tb_ClosedCompetenciesHistory historico
        INNER JOIN tb_Environments ambiente ON ambiente.id = historico.environmentId
        INNER JOIN tb_Users usuario ON usuario.id = historico.userId
        INNER JOIN tb_Ocorrencia ocorrencia ON ocorrencia.id = historico.ocorrenciaId
        WHERE historico.environmentId = ${environmentId}
          AND CONVERT(DATE,HISTORICO.createdAt,112) BETWEEN '${dataInicio}' AND EOMONTH('${dataInicio}')
        GROUP BY usuario.id,
            usuario.nome,
            usuario.cpf,
            usuario.email,
            usuario.avatar,
            usuario.telefone,
            ocorrencia.name,
            historico.observacao,
            historico.image,
            historico.createdAt
      `);

      await data.map(async (historic: any) => {
        res.push({
          id_usuario: historic.id_usuario,
          nome_usuario: historic.nome_usuario,
          cpf_usuario: historic.cpf,
          email_usuario: historic.email_usuario,
          avatar: `https://app-qrseguranca-avatar.s3.amazonaws.com/${historic.avatar}`,
          telefone: historic.telefone,
          ocorrencia: historic.ocorrencia,
          observacao: historic.observacao,
          data: historic.data,
          imagem: `https://app-qrseguranca-ambiente.s3.amazonaws.com/${historic.imagem}`,
        });
        return historic;
      });
    } else if (
      Number(monthInitialSearch) === monthCurrent + 1 &&
      Number(monthFinalSearch) === monthCurrent + 1
    ) {
      const data = await getConnection().query(`
        SELECT usuario.id id_usuario,
            usuario.nome nome_usuario,
            usuario.cpf cpf,
            usuario.email email_usuario,
            usuario.avatar avatar,
            usuario.telefone telefone,
            ocorrencia.name ocorrencia,
            historico.observacao observacao,
            historico.image imagem,
            historico.createdAt data
        FROM tb_HistoricOpenCompetenciesMonth historico
        INNER JOIN tb_Environments ambiente ON ambiente.id = historico.environmentId
        INNER JOIN tb_Users usuario ON usuario.id = historico.userId
        INNER JOIN tb_Ocorrencia ocorrencia ON ocorrencia.id = historico.ocorrenciaId
        WHERE historico.environmentId = ${environmentId}
            AND CONVERT(DATE,historico.createdAt,112) BETWEEN '${dataInicio}' AND '${dataFim}'
      `);
      await data.map(async (historic: any) => {
        res.push({
          id_usuario: historic.id_usuario,
          nome_usuario: historic.nome_usuario,
          cpf_usuario: historic.cpf,
          email_usuario: historic.email_usuario,
          avatar: `https://app-qrseguranca-avatar.s3.amazonaws.com/${historic.avatar}`,
          telefone: historic.telefone,
          ocorrencia: historic.ocorrencia,
          observacao: historic.observacao,
          data: historic.data,
          imagem: `https://app-qrseguranca-ambiente.s3.amazonaws.com/${historic.imagem}`,
        });
        return historic;
      });
    } else {
      res.push('Intervalo de datas inválidos');
    }

    return response.status(200).json({ res });
  }
}
