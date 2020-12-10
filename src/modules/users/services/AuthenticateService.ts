import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import {
  RequestAuthenticateService,
  ResponserAuthenticateService,
} from '@modules/users/services/intefaces/AuthenticateService';

import AppError from '@shared/errors/AppError';
import { HashProvider } from '@modules/users/providers/HashProvider/models/HashProvider';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
export default class AuthenticateService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: RequestAuthenticateService): Promise<ResponserAuthenticateService> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const company = await this.userRepository.findByCompany(user.companyId);

    const token = sign({}, authConfig.secret, {
      subject: String(user.id),
      expiresIn: authConfig.expiresIn,
    });

    return {
      user,
      company,
      token,
    };
  }
}
