import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import environmentsRouter from '@modules/environments/infra/http/routes/environments.routes';
// import environmentsProceduresRouter from '@modules/environmentsProcedures/infra/http/routes/environmentsProcedures.routes';
import companiesRoutes from '@modules/companies/infra/http/routes/companies.routes';
import historicRoutes from '@modules/historic/infra/http/routes/historicOpenCompetenciesMonth.routes';
import ocorrenciaAllRoutes from '@modules/historic/infra/http/routes/ocorrencia.routes';
import ocorrenciaRoutes from '@modules/ocorrencia/infra/http/routes/ocorrencia.routes';
import DashboardController from '@modules/historic/infra/http/controllers/DashboadController';
import dashboardEnvironments from '@modules/environments/infra/http/routes/dashboardEnvironments.routes';

const routes = Router();

// Route test
routes.get('/teste', (request, response) =>
  response.status(200).json({ message: 'Teste' }),
);

routes.get('/dashboard', ensureAuthenticate, new DashboardController().index);
routes.use('/companies', companiesRoutes);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/users', usersRouter);
routes.use('/environments', environmentsRouter);
routes.use('/historic', historicRoutes);
routes.use('/ocorrencia', ocorrenciaRoutes);
routes.use('/all/ocorrencias', ocorrenciaAllRoutes);
routes.use('/dash/environments', dashboardEnvironments);

export default routes;
