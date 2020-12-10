import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/FakeRepository/FakeUserRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '@modules/users/repositories/FakeRepository/FakeUserTokensRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import { factoryUserCorrectValue } from './factories/User';
import {
  factorySendEmailCorrectValue,
  factorySendEmailIncorrectValue,
} from './factories/SendForgotPasswordEmail';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it("should be able return error if email doesn't match", async () => {
    await fakeUserRepository.create(factoryUserCorrectValue);

    expect(
      sendForgotPasswordEmailService.execute(factorySendEmailIncorrectValue),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create(factoryUserCorrectValue);

    await sendForgotPasswordEmailService.execute(factorySendEmailCorrectValue);

    expect(generateToken).toHaveBeenCalledWith(user.id.toString());
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'send');

    await fakeUserRepository.create(factoryUserCorrectValue);

    await sendForgotPasswordEmailService.execute(factorySendEmailCorrectValue);

    expect(sendMail).toHaveBeenCalled();
  });
});
