import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import HistoricOpenCompetenciesMonthController from '@modules/historic/infra/http/controllers/HistoricOpenCompetenciesMonthController';
import HistoricOpenCompetenciesMonthImageController from '@modules/historic/infra/http/controllers/HistoricOpenCompetenciesMonthImageController';

const historicOpenCompetenciesMonthRouter = Router();
const upload = multer(uploadConfig.multer);
const historicOpenCompetenciesMonthController = new HistoricOpenCompetenciesMonthController();
const historicOpenCompetenciesMonthImageController = new HistoricOpenCompetenciesMonthImageController();

historicOpenCompetenciesMonthRouter.use(ensureAuthenticate);
historicOpenCompetenciesMonthRouter.get(
  '/',
  historicOpenCompetenciesMonthController.index,
);
historicOpenCompetenciesMonthRouter.post(
  '/',
  upload.array('image'),
  historicOpenCompetenciesMonthController.create,
);
historicOpenCompetenciesMonthRouter.get(
  '/:id',
  historicOpenCompetenciesMonthController.show,
);
historicOpenCompetenciesMonthRouter.patch(
  '/image/:id',
  upload.single('image'),
  historicOpenCompetenciesMonthImageController.update,
);

export default historicOpenCompetenciesMonthRouter;
