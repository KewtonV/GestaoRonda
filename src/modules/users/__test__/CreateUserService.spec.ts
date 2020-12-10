import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/FakeRepository/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import {
  factoryUserCorrectValue,
  factoryUserIncorrectValue,
  factoryUserIncorrectCpf,
} from './factories/User';

interface SutTypes {
  sut: CreateUserService;
  createUser: CreateUserService;
}

const makeSut = (): SutTypes => {
  const fakeuserRepository = new FakeUserRepository();
  const fakeHashProvider = new FakeHashProvider();
  const createUser = new CreateUserService(
    fakeuserRepository,
    fakeHashProvider,
  );
  const sut = new CreateUserService(fakeuserRepository, fakeHashProvider);

  return { sut, createUser };
};

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const { sut } = makeSut();

    const response = await sut.execute(factoryUserCorrectValue);

    expect(response).toHaveProperty('id');
  });

  it('should be able return error if data invalid', async () => {
    const { sut } = makeSut();

    await expect(sut.execute(factoryUserIncorrectValue)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able return error if email duplicate in database', async () => {
    const { sut, createUser } = makeSut();

    await createUser.execute(factoryUserCorrectValue);

    await expect(sut.execute(factoryUserCorrectValue)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able return error if cpf invalid', async () => {
    const { sut } = makeSut();

    await expect(sut.execute(factoryUserIncorrectCpf)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
