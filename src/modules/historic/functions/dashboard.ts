import { getConnection } from 'typeorm';

export const ClosedMonth = async (
  companyId: any,
  id: any,
  coordenador: any,
  dataInicio: any,
  dataFim: any,
): Promise<any> => {
  let historics: any[];
  const res: any[] = [];

  if (Number(coordenador) !== 1) {
    historics = await getConnection().query(
      `EXEC sp_HistoricEmployees @companyId = ${companyId}, @id = ${id}, @dataInicio = '${dataInicio}', @dataFim = '${dataFim}';`,
    );
    await historics.map((historic: any) => {
      res.push({
        AMBIENTE_ID: historic.id_ambiente,
        AMBIENTE_NOME: historic.nome_ambiente,
        CATEGORIA: historic.categoria,
        ANDAR: historic.andar,
        SETOR: historic.setor,
        ID_PROCEDIMENTO: historic.id_procedimento,
        PROCEDIMENTO: historic.procedimento,
        DATA_INICIO: historic.data_inicio,
        DATA_FIM: historic.data_fim,
        IMAGEM: `https://app-qrseguranca-ambientes3.amazonaws.com/${historic.imagem}`,
      });
      return historic;
    });
    return res;
  }

  historics = await getConnection().query(
    `EXEC sp_HistoricCoordinator @companyId = ${companyId}, @dataInicio = '${dataInicio}', @dataFim = '${dataFim}';`,
  );

  await historics.map((historic: any) => {
    res.push({
      AMBIENTE_ID: historic.AMBIENTE_ID,
      AMBIENTE_NOME: historic.AMBIENTE_NOME,
      CATEGORIA: historic.CATEGORIA,
      ANDAR: historic.ANDAR,
      SETOR: historic.SETOR,
      MATRICULA: historic.matricula,
      USUARIO_ID: historic.USUARIO_ID,
      NOME: historic.NOME,
      EMAIL: historic.EMAIL,
      DT_NASCiMENTO: historic.DT_NASCiMENTO,
      CPF: historic.CPF,
      TELEFONE: historic.TELEFONE,
      ATIVO: historic.ATIVO,
      AVATAR: historic.AVATAR
        ? `https://app-qrcode-avatar.s3.amazonaws.com/${historic.AVATAR}`
        : null,
    });
    return historic;
  });

  return res;
};

export const JoinClosedOpenCompetence = async (
  companyId: any,
  id: any,
  coordenador: any,
  dataInicio: any,
  dataFim: any,
): Promise<any> => {
  let historics: any[];
  const res: any[] = [];

  if (Number(coordenador) !== 1) {
    historics = await getConnection().query(
      `EXEC sp_JoinHistoricOpenClosedEmployees @companyId = ${companyId}, @id = ${id}, @dataInicio = '${dataInicio}', @dataFim = '${dataFim}';`,
    );
    await historics.map((historic: any) => {
      res.push({
        AMBIENTE_ID: historic.id_ambiente,
        AMBIENTE_NOME: historic.nome_ambiente,
        OBSERVACAO: historic.observacao,
        OCORRENCIA_ID: historic.ocorrencia_id,
        OCORRENCIA_NOME: historic.ocorrencia_name,
        DATA_INICIO: historic.data_inicio,
        DATA_FIM: historic.data_fim,
        IMAGEM: `https://app-qrseguranca-ambiente.s3.amazonaws.com/${historic.imagem}`,
      });
      return historic;
    });
    return res;
  }

  historics = await getConnection().query(
    `EXEC sp_JoinHistoricOpenClosedCoordinator @companyId = ${companyId}, @dataInicio = '${dataInicio}', @dataFim = '${dataFim}';`,
  );

  await historics.map((historic: any) => {
    res.push({
      AMBIENTE_ID: historic.id_ambiente,
      AMBIENTE_NOME: historic.nome_ambiente,
      CATEGORIA: historic.categoria,
      ANDAR: historic.andar,
      SETOR: historic.setor,
      USUARIO_ID: historic.id_usuario,
      MATRICULA: historic.matricula,
      NOME: historic.nome,
      EMAIL: historic.email,
      DT_NASCiMENTO: historic.dt_nascimento,
      CPF: historic.cpf,
      TELEFONE: historic.telefone,
      ATIVO: historic.ativo,
      AVATAR: historic.avatar
        ? `https://app-qrcode-avatar.s3.amazonaws.com/${historic.avatar}`
        : null,
    });
    return historic;
  });

  return res;
};

export const OpenMonth = async (
  companyId: any,
  id: any,
  coordenador: any,
  dataInicio: any,
  dataFim: any,
): Promise<any> => {
  let ambientes: any[];
  const res: any[] = [];

  if (Number(coordenador) !== 1) {
    ambientes = await getConnection().query(
      `EXEC sp_HistoricEmployees @companyId = ${companyId}, @id = ${id}, @dataInicio = '${dataInicio}', @dataFim = '${dataFim}';`,
    );

    await ambientes.map(async (historic: any) => {
      res.push({
        AMBIENTE_ID: historic.id_ambiente,
        AMBIENTE_NOME: historic.nome_ambiente,
        ID_OCORRENCIA: historic.id_ocorrencia,
        OCORRENCIA: historic.nome_ocorrencia,
        DATA_INICIO: historic.data_inicio,
        DATA_FIM: historic.data_fim,
        IMAGEM: `https://app-qrseguranca-ambiente.s3.amazonaws.com/${historic.imagem}`,
        OBSERVACAO: historic.observacao,
      });
      return historic;
    });
    return res;
  }

  ambientes = await getConnection().query(
    `EXEC sp_HistoricCoordinator @companyId = ${companyId}, @dataInicio = '${dataInicio}', @dataFim = '${dataFim}';`,
  );

  await ambientes.map((historic: any) => {
    res.push({
      AMBIENTE_ID: historic.id_ambiente,
      AMBIENTE_NOME: historic.nome_ambiente,
      CATEGORIA: historic.categoria,
      ANDAR: historic.andar,
      SETOR: historic.setor,
      USUARIO_ID: historic.id_usuario,
      MATRICULA: historic.matricula,
      NOME: historic.nome,
      EMAIL: historic.email,
      DT_NASCiMENTO: historic.dt_nascimento,
      CPF: historic.cpf,
      TELEFONE: historic.telefone,
      ATIVO: historic.ativo,
      AVATAR: historic.avatar
        ? `https://app-qrcode-avatar.s3.amazonaws.com/${historic.avatar}`
        : null,
    });
    return historic;
  });

  return res;
};
