import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import RequestUpdateUserService from '@modules/users/services/intefaces/UpdateUserService';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { HashProvider } from '@modules/users/providers/HashProvider/models/HashProvider';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({
    userId,
    nome,
    telefone,
    email,
    oldPassword,
    newPassword,
    passwordConfirmation,
  }: RequestUpdateUserService): Promise<User> {
    const id: number = +userId;

    if (newPassword !== passwordConfirmation) {
      throw new AppError("Password don't match.");
    }

    const user = await this.usersRepository.findById(id.toString());

    if (!user) {
      throw new AppError('Only authenticated users can change data.');
    }

    if (nome && user.nome !== nome) {
      user.nome = nome;
    }

    if (user.telefone !== telefone && telefone) {
      user.telefone = telefone;
    }

    if (user.email !== email && email) {
      const checkUserExists = await this.usersRepository.findByEmail(email);
      if (checkUserExists) {
        throw new AppError('Email address already used.');
      }

      user.email = email;
    }

    if (
      oldPassword &&
      !(await this.hashProvider.compareHash(oldPassword, user.password))
    ) {
      throw new AppError('Password does not match.');
    } else if (newPassword) {
      user.password = await hash(newPassword, 8);
    }

    await this.usersRepository.save(user);

    return user;
  }
}
