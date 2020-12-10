import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateService from '@modules/users/services/AuthenticateService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateService);
    const { user, company, token } = await authenticateUser.execute({
      email,
      password,
    });
    delete user.password;
    return response
      .status(200)
      .json({ user: classToClass(user), company, token });
  }
}
