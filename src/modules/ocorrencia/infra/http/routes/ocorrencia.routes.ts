import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import uploadConfig from '@config/upload';
import ProceduresController from '@modules/ocorrencia/infra/http/controller/OcorrenciaController';
import ProcedureImageController from '@modules/ocorrencia/infra/http/controller/ProcedureImageController';
import ProceduresEnvironmentController from '@modules/ocorrencia/infra/http/controller/ProceduresEnvironmentController';

const proceduresRouter = Router();
const upload = multer(uploadConfig.multer);
const proceduresController = new ProceduresController();
const procedureImageController = new ProcedureImageController();
const proceduresEnvironmentController = new ProceduresEnvironmentController();

proceduresRouter.use(ensureAuthenticate);
proceduresRouter.get('/', proceduresController.index);
proceduresRouter.post('/', proceduresController.create);
proceduresRouter.get('/:id', proceduresController.show);
proceduresRouter.delete('/:id', proceduresController.delete);
proceduresRouter.put('/:id', proceduresController.update);
proceduresRouter.patch(
  '/image/:id',
  upload.single('image'),
  procedureImageController.update,
);
proceduresRouter.get('/options/:id', proceduresEnvironmentController.index);

export default proceduresRouter;
