import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import {
  ClosedMonth,
  JoinClosedOpenCompetence,
  OpenMonth,
} from '@modules/historic/functions/dashboard';

export default class DashboardController {
  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { companyId, coordenador, dataInicio, dataFim } = request.query;

    const monthCurrent = new Date().getMonth();
    const monthInitialSearch = dataInicio.slice(5, 7);
    const monthFinalSearch = dataFim.slice(5, 7);

    let res: any[] = [];

    if (
      Number(monthInitialSearch) < monthCurrent + 1 &&
      Number(monthFinalSearch) < monthCurrent + 1
    ) {
      res = await ClosedMonth(companyId, id, coordenador, dataInicio, dataFim);
    } else if (
      Number(monthInitialSearch) < monthCurrent + 1 &&
      Number(monthFinalSearch) === monthCurrent + 1
    ) {
      res = await JoinClosedOpenCompetence(
        companyId,
        id,
        coordenador,
        dataInicio,
        dataFim,
      );
    } else if (
      Number(monthInitialSearch) === monthCurrent + 1 &&
      Number(monthFinalSearch) === monthCurrent + 1
    ) {
      res = await OpenMonth(companyId, id, coordenador, dataInicio, dataFim);
    } else {
      res.push('Intervalo de datas inválidos');
    }

    return response.status(200).json({ res });
  }

  async all(request: Request, response: Response): Promise<Response> {
    const { companyId, dataInicio, dataFim } = request.query;
    const monthCurrent = new Date().getMonth();
    const monthInitialSearch = dataInicio.slice(5, 7);
    const monthFinalSearch = dataFim.slice(5, 7);

    const res: any[] = [];

    if (
      Number(monthInitialSearch) < monthCurrent + 1 &&
      Number(monthFinalSearch) < monthCurrent + 1
    ) {
      const data = await getConnection().query(`
        SELECT historico.id id_historico,
            usuario.nome nome_usuario,
            usuario.cpf cpf,
            usuario.email email,
            usuario.avatar avatar,
            usuario.dataNascimento dt_nascimento,
            usuario.telefone telefone,
            ambiente.id id_ambiente,
            ambiente.name nome_ambiente,
            ocorrencia.name ocorrencia,
            historico.observacao observacao,
            historico.image imagem,
            historico.createdAt data
        FROM tb_ClosedCompetenciesHistory historico
        INNER JOIN tb_Environments ambiente ON ambiente.id = historico.environmentId
        INNER JOIN tb_Users usuario ON usuario.id = historico.userId
        INNER JOIN tb_Ocorrencia ocorrencia ON ocorrencia.id = historico.ocorrenciaId
        WHERE ocorrencia.companyId = ${companyId}
          AND CONVERT(DATE,historico.createdAt,112) BETWEEN '${dataInicio}' AND '${dataFim}'
      `);

      await data.map(async (historic: any) => {
        res.push({
          id_usuario: historic.id_usuario,
          nome_usuario: historic.nome_usuario,
          cpf: historic.cpf,
          email: historic.email,
          avatar: historic.avatar
            ? `https://app-qrseguranca-avatar.s3.amazonaws.com/${historic.avatar}`
            : historic.avatar,
          dt_nascimento: historic.dt_nascimento,
          telefone: historic.telefone,
          id_ambiente: historic.id_ambiente,
          nome_ambiente: historic.nome_ambiente,
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
            usuario.email email,
            usuario.avatar avatar,
            usuario.dataNascimento dt_nascimento,
            usuario.telefone telefone,
            ambiente.id id_ambiente,
            ambiente.name nome_ambiente,
            ocorrencia.name ocorrencia,
            historico.observacao observacao,
            historico.image imagem,
            historico.createdAt data
        FROM tb_HistoricOpenCompetenciesMonth historico
        INNER JOIN tb_Environments ambiente ON ambiente.id = historico.environmentId
        INNER JOIN tb_Users usuario ON usuario.id = historico.userId
        INNER JOIN tb_Ocorrencia ocorrencia ON ocorrencia.id = historico.ocorrenciaId
        WHERE ocorrencia.companyId = ${companyId}
          AND CONVERT(DATE,historico.createdAt,112) BETWEEN DATEFROMPARTS(YEAR('${dataFim}'),MONTH('${dataFim}'),1) AND '${dataFim}'
        UNION
        SELECT historico.id id_historico,
            usuario.nome nome_usuario,
            usuario.cpf cpf,
            usuario.email email,
            usuario.avatar avatar,
            usuario.dataNascimento dt_nascimento,
            usuario.telefone telefone,
            ambiente.id id_ambiente,
            ambiente.name nome_ambiente,
            ocorrencia.name ocorrencia,
            historico.observacao observacao,
            historico.image imagem,
            historico.createdAt data
        FROM tb_ClosedCompetenciesHistory historico
        INNER JOIN tb_Environments ambiente ON ambiente.id = historico.environmentId
        INNER JOIN tb_Users usuario ON usuario.id = historico.userId
        INNER JOIN tb_Ocorrencia ocorrencia ON ocorrencia.id = historico.ocorrenciaId
        WHERE ocorrencia.companyId = ${companyId}
          AND CONVERT(DATE,HISTORICO.createdAt,112) BETWEEN '${dataInicio}' AND EOMONTH('${dataInicio}')
      `);

      await data.map(async (historic: any) => {
        res.push({
          id_usuario: historic.id_usuario,
          nome_usuario: historic.nome_usuario,
          cpf: historic.cpf,
          email: historic.email,
          avatar: historic.avatar
            ? `https://app-qrseguranca-avatar.s3.amazonaws.com/${historic.avatar}`
            : historic.avatar,
          dt_nascimento: historic.dt_nascimento,
          telefone: historic.telefone,
          id_ambiente: historic.id_ambiente,
          nome_ambiente: historic.nome_ambiente,
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
            usuario.email email,
            usuario.avatar avatar,
            usuario.dataNascimento dt_nascimento,
            usuario.telefone telefone,
            ambiente.id id_ambiente,
            ambiente.name nome_ambiente,
            ocorrencia.name ocorrencia,
            historico.observacao observacao,
            historico.image imagem,
            historico.createdAt data
        FROM tb_HistoricOpenCompetenciesMonth historico
        INNER JOIN tb_Environments ambiente ON ambiente.id = historico.environmentId
        INNER JOIN tb_Users usuario ON usuario.id = historico.userId
        INNER JOIN tb_Ocorrencia ocorrencia ON ocorrencia.id = historico.ocorrenciaId
        WHERE ocorrencia.companyId = ${companyId}
          AND CONVERT(DATE,historico.createdAt,112) BETWEEN '${dataInicio}' AND '${dataFim}'
      `);
      await data.map(async (historic: any) => {
        res.push({
          id_usuario: historic.id_usuario,
          nome_usuario: historic.nome_usuario,
          cpf: historic.cpf,
          email: historic.email,
          avatar: historic.avatar
            ? `https://app-qrseguranca-avatar.s3.amazonaws.com/${historic.avatar}`
            : historic.avatar,
          dt_nascimento: historic.dt_nascimento,
          telefone: historic.telefone,
          id_ambiente: historic.id_ambiente,
          nome_ambiente: historic.nome_ambiente,
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
