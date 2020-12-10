import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IEnvironmentsRepository from '@modules/environments/repositories/IEnvironmentsRepository';
import EnvironmentsRepository from '@modules/environments/infra/typeorm/repositories/EnvironmentsRepository';
import IHistoricOpenCompetenciesMonthRepository from '@modules/historic/repositories/IHistoricOpenCompetenciesMonthRepository';
import HistoricOpenCompetenciesMonthRepository from '@modules/historic/infra/typeorm/repositories/HistoricOpenCompetenciesMonthRepository';
import IProcedureRepository from '@modules/ocorrencia/repositories/IOcorrenciaRepository';
import ProcedureRepository from '@modules/ocorrencia/infra/typeorm/repositories/OcorrenciaRepository';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IEnvironmentsRepository>(
  'EnvironmentsRepository',
  EnvironmentsRepository,
);

container.registerSingleton<IHistoricOpenCompetenciesMonthRepository>(
  'HistoricOpenCompetenciesMonthRepository',
  HistoricOpenCompetenciesMonthRepository,
);

container.registerSingleton<IProcedureRepository>(
  'ProcedureRepository',
  ProcedureRepository,
);
