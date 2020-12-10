import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/FakeRepository/FakeUserRepository';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import { factoryUserCorrectValue } from './factories/User';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserService: UpdateUserService;

describe('UpdateUserService', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    await fakeUserRepository.create(factoryUserCorrectValue);
  });

  it("should be able return error if new password and password confirmation doesn't match", async () => {
    const update = {
      userId: '1',
      oldPassword: '',
      newPassword: '123456',
      passwordConfirmation: '12345',
    };

    expect(updateUserService.execute(update)).rejects.toBeInstanceOf(AppError);
  });

  it("should be able return error if user doesn't authenticated", async () => {
    const update = {
      userId: 'id_invalid',
      name: 'André',
    };

    expect(updateUserService.execute(update)).rejects.toBeInstanceOf(AppError);
  });

  it('should update name', async () => {
    const update = {
      userId: '1',
      nome: 'André',
    };

    const response = await updateUserService.execute(update);

    expect(response).toHaveProperty('id');
    expect(response.nome).toBe(update.nome);
  });

  it('should update phone', async () => {
    const update = {
      userId: '1',
      telefone: '00000000000',
    };

    const response = await updateUserService.execute(update);

    expect(response).toHaveProperty('id');
    expect(response.telefone).toBe(update.telefone);
  });

  it('should update email', async () => {
    const update = {
      userId: '1',
      email: 'andre2@gmail.com',
    };

    const response = await updateUserService.execute(update);

    expect(response).toHaveProperty('id');
    expect(response.email).toBe(update.email);
  });

  it('should return error if oldPassword is wrong', async () => {
    const update = {
      userId: '1',
      oldPassword: '1234567',
      newPassword: '1234567',
      passwordConfirmation: '1234567',
    };

    expect(updateUserService.execute(update)).rejects.toBeInstanceOf(AppError);
  });

  it('should update password', async () => {
    const update = {
      userId: '1',
      oldPassword: '123456',
      newPassword: '1234567',
      passwordConfirmation: '1234567',
    };

    const response = await updateUserService.execute(update);

    expect(response).toHaveProperty('id');
  });
});
