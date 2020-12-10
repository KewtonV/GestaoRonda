import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import CompaniesController from '@modules/companies/infra/http/controllers/CompaniesController';

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.use(ensureAuthenticate);
companiesRouter.get('/', companiesController.show);

export default companiesRouter;
