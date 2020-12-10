import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/FakeRepository/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateService from '@modules/users/services/AuthenticateService';
import CreateUserService from '../services/CreateUserService';
import { factoryUserCorrectValue } from './factories/User';
import {
  factoryAuthenticateIncorrectEmail,
  factoryAuthenticateIncorrectPassword,
} from './factories/Auth';

let fakeuserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateService: AuthenticateService;

describe('AuthenticateService', () => {
  beforeEach(async () => {
    fakeuserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateService = new AuthenticateService(
      fakeuserRepository,
      fakeHashProvider,
    );

    await fakeuserRepository.create(factoryUserCorrectValue);
  });

  it("should be able return error if email doesn't match", async () => {
    expect(
      authenticateService.execute(factoryAuthenticateIncorrectEmail),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able return error if password doesn't match", async () => {
    expect(
      authenticateService.execute(factoryAuthenticateIncorrectPassword),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate', async () => {
    const response = await authenticateService.execute({
      email: 'andre@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
});
