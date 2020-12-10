import { inject, injectable } from 'tsyringe';
import {
  RequestMailService,
  ResponseMailSevice,
} from '@modules/users/services/intefaces/MailService';
import AppError from '@shared/errors/AppError';
import UsersRepository from '@modules/users/repositories/IUserRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import MailProvider from '@shared/container/providers/MailProvider/model/MailProvider';

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository,
    @inject('SendMailProvider')
    private mailProvider: MailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({
    email,
  }: RequestMailService): Promise<ResponseMailSevice> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Emails don't match.");
    }

    const token = await this.userTokensRepository.generate(user.id.toString());

    this.mailProvider.send(user, token.token);
    return {
      message: 'Email sent successfully',
    };
  }
}
