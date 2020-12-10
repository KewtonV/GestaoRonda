import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import User from '@modules/users/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

export default class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.query;
    const usersRepository = getRepository(User);
    const user = await usersRepository.find({
      where: { companyId, coordenador: 0 },
    });

    return response.status(200).json(classToClass(user));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      email,
      emailConfirmation,
      password,
      dataNascimento,
      cpf,
      telefone,
    } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      nome,
      email,
      emailConfirmation,
      password,
      dataNascimento,
      cpf,
      telefone,
    });

    delete user.password;

    return response.json({ user: classToClass(user) });
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const usersRepository = getRepository(User);
    const users = await usersRepository.findOne(id);
    return response.status(200).json({ users: classToClass(users) });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      telefone,
      email,
      oldPassword,
      newPassword,
      passwordConfirmation,
    } = request.body;
    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({
      userId: request.user.id,
      nome,
      telefone,
      email,
      oldPassword,
      newPassword,
      passwordConfirmation,
    });
    delete user.password;
    return response.status(200).json({ user: classToClass(user) });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(id);
    await usersRepository.remove(user);
    return response.status(200).json({ message: 'User successfully deleted' });
  }
}
