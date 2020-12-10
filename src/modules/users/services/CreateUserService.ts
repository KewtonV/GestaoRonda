import { injectable, inject } from 'tsyringe';
import * as Yup from 'yup';

import User from '@modules/users/infra/typeorm/entities/User';
import CpfValidatorAdapter from '@shared/utils/cpfValidator';
import RequestUserService from '@modules/users/services/intefaces/CreateUserService';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { HashProvider } from '@modules/users/providers/HashProvider/models/HashProvider';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({
    nome,
    email,
    emailConfirmation,
    password,
    dataNascimento,
    cpf,
    telefone,
  }: RequestUserService): Promise<User> {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      emailConfirmation: Yup.string().oneOf([Yup.ref('email')]),
      password: Yup.string().min(6).required(),
      dataNascimento: Yup.string().required(),
      cpf: Yup.string().min(11).required(),
      telefone: Yup.string().min(10).max(11).required(),
    });

    if (
      !(await schema.isValid({
        nome,
        email,
        emailConfirmation,
        password,
        dataNascimento,
        cpf,
        telefone,
      }))
    ) {
      throw new AppError('Validation fails.');
    }

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const cpfValidator = new CpfValidatorAdapter().isValid(cpf);

    if (!cpfValidator) {
      throw new AppError('Invalid cpf.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const userData = {
      nome,
      email,
      password: hashedPassword,
      dataNascimento,
      cpf,
      telefone,
      ativo: 1,
      coordenador: 0,
      tipo: 'Fixo',
    };
    const user = await this.usersRepository.create(userData);
    return user;
  }
}
