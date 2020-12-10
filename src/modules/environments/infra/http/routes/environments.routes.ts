import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import EnvironmentsController from '@modules/environments/infra/http/controllers/EnvironmentsController';
import EnvironmentsFormController from '@modules/environments/infra/http/controllers/EnvironmentsFormController';
import DashboardEnvironmentsController from '@modules/environments/infra/http/controllers/DashboardEnvironmentsController';

const environmentsRouter = Router();
const environmentsController = new EnvironmentsController();
const environmentsFormController = new EnvironmentsFormController();
const dashboardEnvironmentsController = new DashboardEnvironmentsController();

environmentsRouter.use(ensureAuthenticate);

environmentsRouter.get('/', environmentsController.index);
environmentsRouter.post('/', environmentsController.create);
environmentsRouter.get('/:id', environmentsController.show);
environmentsRouter.put('/:id', environmentsController.update);
environmentsRouter.delete('/:id', environmentsController.delete);
environmentsRouter.get('/form', environmentsFormController.form);
environmentsRouter.get('/dashboard', dashboardEnvironmentsController.index);

export default environmentsRouter;
