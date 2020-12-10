import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import uploadConfig from '@config/upload';
import UsersController from '@modules/users/infra/http/controller/UsersController';
import UserAvatarController from '@modules/users/infra/http/controller/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.use(ensureAuthenticate);

usersRouter.get('/', usersController.index);

usersRouter.get('/:id', usersController.show);

usersRouter.delete('/:id', usersController.delete);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

usersRouter.put('/update', usersController.update);

export default usersRouter;
