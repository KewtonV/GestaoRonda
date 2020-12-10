import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import DashboardEnvironmentsController from '@modules/environments/infra/http/controllers/DashboardEnvironmentsController';

const environmentsRouter = Router();
const dashboardEnvironmentsController = new DashboardEnvironmentsController();

environmentsRouter.use(ensureAuthenticate);

environmentsRouter.get('/', dashboardEnvironmentsController.index);
environmentsRouter.get('/info', dashboardEnvironmentsController.info);

export default environmentsRouter;
