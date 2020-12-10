import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import DashboadController from '@modules/historic/infra/http/controllers/DashboadController';

const dashboadControllerRouter = Router();
const dashboadController = new DashboadController();

dashboadControllerRouter.use(ensureAuthenticate);
dashboadControllerRouter.get('/', dashboadController.all);

export default dashboadControllerRouter;
