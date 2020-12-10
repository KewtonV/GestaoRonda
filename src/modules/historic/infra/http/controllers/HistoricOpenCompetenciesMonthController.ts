import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateHistoricOpenCompetenciesMonthServices from '@modules/historic/services/CreateHistoricOpenCompetenciesMonthServices';
import { getConnection } from 'typeorm';
import { classToClass } from 'class-transformer';

export default class HistoricOpenCompetenciesMonthController {
  async index(request: Request, response: Response): Promise<Response> {
    const { userId, dataInicio, dataFim } = request.query;

    const monthCurrent = new Date().getMonth();
    const monthInitialSearch = dataInicio.slice(5, 7);
    const monthFinalSearch = dataFim.slice(5, 7);

    const res: any[] = [];
    let data: any[] = [];

    if (
      Number(monthInitialSearch) < monthCurrent + 1 &&
      Number(monthFinalSearch) < monthCurrent + 1
    ) {
      data = await getConnection().query(`
        SELECT HISTORICO.id ID,
            USUARIO.nome USUARIO,
            AMBIENTE.id AMBIENTE_ID,
            AMBIENTE.name AMBIENTE_NOME,
            OCORRENCIA.name OCORRENCIA_NOME,
            HISTORICO.createdAt INICIO,
            HISTORICO.updatedAt FIM,
            HISTORICO.image IMAGEM,
            HISTORICO.observacao obeservacao
        FROM tb_ClosedCompetenciesHistory HISTORICO
        INNER JOIN tb_Users USUARIO ON USUARIO.id = HISTORICO.userId
        INNER JOIN tb_Environments AMBIENTE ON AMBIENTE.id = HISTORICO.environmentId
        INNER JOIN tb_Ocorrencia OCORRENCIA ON OCORRENCIA.id = HISTORICO.ocorrenciaId
        WHERE HISTORICO.userId = ${userId}
                AND CONVERT(DATE,HISTORICO.createdAt,112) BETWEEN '${dataInicio}' AND EOMONTH('${dataInicio}')
        GROUP BY  HISTORICO.id,
                USUARIO.nome,
                AMBIENTE.id,
                AMBIENTE.name,
                OCORRENCIA.name,
                HISTORICO.createdAt,
                HISTORICO.updatedAt,
                HISTORICO.image,
                HISTORICO.observacao
      `);
    } else if (
      Number(monthInitialSearch) < monthCurrent + 1 &&
      Number(monthFinalSearch) === monthCurrent + 1
    ) {
      data = await getConnection().query(`
        SELECT HISTORICO.id ID,
            USUARIO.nome USUARIO,
            AMBIENTE.id AMBIENTE_ID,
            AMBIENTE.name AMBIENTE_NOME,
            OCORRENCIA.name OCORRENCIA_NOME,
            HISTORICO.createdAt INICIO,
            HISTORICO.updatedAt FIM,
            HISTORICO.image IMAGEM,
            HISTORICO.observacao obeservacao
        FROM tb_ClosedCompetenciesHistory HISTORICO
        INNER JOIN tb_Users USUARIO ON USUARIO.id = HISTORICO.userId
        INNER JOIN tb_Environments AMBIENTE ON AMBIENTE.id = HISTORICO.environmentId
        INNER JOIN tb_Ocorrencia OCORRENCIA ON OCORRENCIA.id = HISTORICO.ocorrenciaId
        WHERE HISTORICO.userId = ${userId}
                AND CONVERT(DATE,HISTORICO.createdAt,112) BETWEEN '${dataInicio}' AND EOMONTH('${dataInicio}')
        GROUP BY  HISTORICO.id,
                USUARIO.nome,
                AMBIENTE.id,
                AMBIENTE.name,
                OCORRENCIA.name,
                HISTORICO.createdAt,
                HISTORICO.updatedAt,
                HISTORICO.image,
                HISTORICO.observacao
        UNION
        SELECT HISTORICO.id ID,
            USUARIO.nome USUARIO,
            AMBIENTE.id AMBIENTE_ID,
            AMBIENTE.name AMBIENTE_NOME,
            OCORRENCIA.name OCORRENCIA_NOME,
            HISTORICO.createdAt INICIO,
            HISTORICO.updatedAt FIM,
            HISTORICO.image IMAGEM,
            HISTORICO.observacao obeservacao
        FROM tb_HistoricOpenCompetenciesMonth HISTORICO
        INNER JOIN tb_Users USUARIO ON USUARIO.id = HISTORICO.userId
        INNER JOIN tb_Environments AMBIENTE ON AMBIENTE.id = HISTORICO.environmentId
        INNER JOIN tb_Ocorrencia OCORRENCIA ON OCORRENCIA.id = HISTORICO.ocorrenciaId
        WHERE HISTORICO.userId = ${userId}
                AND CONVERT(DATE,historico.createdAt,112) BETWEEN DATEFROMPARTS(YEAR('${dataFim}'),MONTH('${dataFim}'),1) AND '${dataFim}'
        GROUP BY  HISTORICO.id,
                USUARIO.nome,
                AMBIENTE.id,
                AMBIENTE.name,
                OCORRENCIA.name,
                HISTORICO.createdAt,
                HISTORICO.updatedAt,
                HISTORICO.image,
                HISTORICO.observacao
        ORDER BY ambiente.id;
      `);
    } else if (
      Number(monthInitialSearch) === monthCurrent + 1 &&
      Number(monthFinalSearch) === monthCurrent + 1
    ) {
      data = await getConnection().query(`
        SELECT HISTORICO.id ID,
            USUARIO.nome USUARIO,
            AMBIENTE.id AMBIENTE_ID,
            AMBIENTE.name AMBIENTE_NOME,
            OCORRENCIA.name OCORRENCIA_NOME,
            HISTORICO.createdAt INICIO,
            HISTORICO.updatedAt FIM,
            HISTORICO.image IMAGEM,
            HISTORICO.observacao obeservacao
        FROM tb_HistoricOpenCompetenciesMonth HISTORICO
        INNER JOIN tb_Users USUARIO ON USUARIO.id = HISTORICO.userId
        INNER JOIN tb_Environments AMBIENTE ON AMBIENTE.id = HISTORICO.environmentId
        INNER JOIN tb_Ocorrencia OCORRENCIA ON OCORRENCIA.id = HISTORICO.ocorrenciaId
        WHERE HISTORICO.userId = ${userId}
                AND CONVERT(DATE,historico.createdAt,112) BETWEEN '${dataInicio}' AND '${dataFim}'
        GROUP BY  HISTORICO.id,
                USUARIO.nome,
                AMBIENTE.id,
                AMBIENTE.name,
                OCORRENCIA.name,
                HISTORICO.createdAt,
                HISTORICO.updatedAt,
                HISTORICO.image,
                HISTORICO.observacao
      `);
    } else {
      res.push('Intervalo de datas inválidos');
    }
    await data.map((historic: any) => {
      res.push({
        HISTORICO_ID: historic.ID,
        USUARIO: historic.USUARIO,
        AMBIENTE_ID: historic.AMBIENTE_ID,
        AMBIENTE_NOME: historic.AMBIENTE_NOME,
        OCORRENCIA_NOME: historic.OCORRENCIA_NOME,
        OBSERVACAO: historic.obeservacao,
        INICIO: historic.INICIO,
        FIM: historic.FIM,
        IMAGEM: `https://app-qrseguranca-ambiente.s3.amazonaws.com/${historic.IMAGEM}`,
      });
    });
    return response.status(200).json({ res });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      userId,
      environmentId,
      ocorrenciaId,
      observacao,
      createdAt,
      updatedAt,
    } = request.body;
    const historicFileName = request.files;
    const createHistoricOpenCompetenciesMonth = container.resolve(
      CreateHistoricOpenCompetenciesMonthServices,
    );
    const historicOpenCompetenciesMonth = await createHistoricOpenCompetenciesMonth.execute(
      {
        userId,
        environmentId,
        ocorrenciaId,
        observacao,
        createdAt,
        updatedAt,
        historicFileName,
      },
    );

    return response.json({
      historicOpenCompetenciesMonth: classToClass(
        historicOpenCompetenciesMonth,
      ),
    });
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const historic = await getConnection().query(
      `SELECT Historico.id,
              Usuario.nome AS USUARIO,
              Ambiente.name AS AMBIENTE,
              Procedimento.name AS PROCEDIMENTO,
              Historico.image,
              Historico.createdAt,
              Historico.updatedAt
       FROM tb_HistoricOpenCompetenciesMonth AS Historico
       INNER JOIN tb_Users as Usuario ON Usuario.id = Historico.userId
       INNER JOIN tb_Environments as Ambiente ON Ambiente.id = Historico.environmentId
       INNER JOIN tb_Procedures as Procedimento ON Procedimento.id = Historico.tasksId
       WHERE Historico.id = ${id}`,
    );

    const res = {
      id: historic[0].id,
      userId: historic[0].USUARIO,
      environmentId: historic[0].AMBIENTE,
      tasksId: historic[0].PROCEDIMENTO,
      createdAt: historic[0].createdAt,
      updatedAt: historic[0].updatedAt,
      imageUrl: `https://app-qrcode-salaprocedimentos.s3.amazonaws.com/${historic[0].image}`,
    };
    return response.status(200).json(res);
  }
}
