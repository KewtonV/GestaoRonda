import { Router } from 'express';
import ForgotPasswordController from '@modules/users/infra/http/controller/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controller/ResetPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const passwordRouter = Router();

passwordRouter.post('/forgot', forgotPasswordController.create);

passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
