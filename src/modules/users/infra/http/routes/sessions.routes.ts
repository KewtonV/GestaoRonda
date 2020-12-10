import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controller/SessionsController';

const sessionsRouter = Router();
const sessiontsController = new SessionsController();

sessionsRouter.post('/', sessiontsController.create);

export default sessionsRouter;
