import { inject, injectable } from 'tsyringe';
import { isAfter, addMinutes } from 'date-fns';
import * as Yup from 'yup';

import RequestChangePasswordService from '@modules/users/services/intefaces/ResetPasswordService';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { HashProvider } from '@modules/users/providers/HashProvider/models/HashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
export default class MailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({
    password,
    passwordConfirmation,
    token,
  }: RequestChangePasswordService): Promise<User> {
    const schema = Yup.object().shape({
      password: Yup.string().required(),
      passwordConfirmation: Yup.string()
        .required()
        .oneOf([Yup.ref('password')]),
      token: Yup.string().required(),
    });

    if (!(await schema.isValid({ password, passwordConfirmation, token }))) {
      throw new AppError('Validation fails.');
    }

    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    const user = await this.userRepository.findById(
      userToken.userId.toString(),
    );

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.createdAt;

    const copareDate = addMinutes(tokenCreatedAt, 30);

    if (isAfter(Date.now(), copareDate)) {
      throw new AppError('Token expired.');
    }
    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);

    await this.userTokensRepository.delete(userToken);

    return user;
  }
}
