import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { password, passwordConfirmation, token } = request.body;
    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      password,
      passwordConfirmation,
      token,
    });
    return response.status(200).json('Password changed successfully.');
  }
}
