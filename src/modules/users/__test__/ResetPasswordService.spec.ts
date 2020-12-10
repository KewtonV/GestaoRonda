import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/FakeRepository/FakeUserRepository';
import FakeUserTokensRepository from '@modules/users/repositories/FakeRepository/FakeUserTokensRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { factoryUserCorrectValue } from '@modules/users/__test__/factories/User';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('Reset Password Service', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able return error data invalid', async () => {
    const user = await fakeUserRepository.create(factoryUserCorrectValue);
    const { token } = await fakeUserTokensRepository.generate(
      user.id.toString(),
    );
    const data = {
      password: '123456',
      passwordConfirmation: '1234567',
      token,
    };

    await expect(resetPasswordService.execute(data)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able return error token invalid', async () => {
    const data = {
      password: '1234567',
      passwordConfirmation: '1234567',
      token: '',
    };

    expect(resetPasswordService.execute(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able return error token invalid', async () => {
    const data = {
      password: '1234567',
      passwordConfirmation: '1234567',
      token: '',
    };

    expect(resetPasswordService.execute(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able return error token does not exists', async () => {
    const data = {
      password: '1234567',
      passwordConfirmation: '1234567',
      token: '16516s1vfdfgdse',
    };

    expect(resetPasswordService.execute(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able return error token disabled', async () => {
    await fakeUserRepository.create(factoryUserCorrectValue);
    const { token } = await fakeUserTokensRepository.generate('1');
    const data = {
      password: '1234567',
      passwordConfirmation: '1234567',
      token,
      active: 0,
    };

    expect(resetPasswordService.execute(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able return error user does not exists', async () => {
    const { token } = await fakeUserTokensRepository.generate('1');
    const data = {
      password: '1234567',
      passwordConfirmation: '1234567',
      token,
    };

    expect(resetPasswordService.execute(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset the password', async () => {
    let user = await fakeUserRepository.create(factoryUserCorrectValue);
    const { token } = await fakeUserTokensRepository.generate(
      user.id.toString(),
    );
    const data = {
      password: '1234567',
      passwordConfirmation: '1234567',
      token,
    };

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute(data);

    user = await fakeUserRepository.findById(user.id.toString());

    expect(generateHash).toHaveBeenCalledWith('1234567');
    expect(user?.password).toBe('1234567');
  });

  it('should not be able to reset password if passed more than 30 min', async () => {
    const user = await fakeUserRepository.create(factoryUserCorrectValue);
    const { token } = await fakeUserTokensRepository.generate(
      user.id.toString(),
    );
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getMinutes() + 35);
    });

    const data = {
      password: '1234567',
      passwordConfirmation: '1234567',
      token,
    };

    expect(resetPasswordService.execute(data)).rejects.toBeInstanceOf(AppError);
  });
});
