import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/FakeRepository/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { factoryUserCorrectValue } from './factories/User';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatarService', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    await fakeUserRepository.create(factoryUserCorrectValue);
  });

  it('should be able update user avatar', async () => {
    const updateAvatar = await updateUserAvatarService.execute({
      userId: '1',
      avatarFileName: 'avatar.jpg',
    });

    expect(updateAvatar.avatar).toBe('avatar.jpg');
  });

  it('should be able return error id not found', async () => {
    expect(
      updateUserAvatarService.execute({
        userId: '5',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able delete avatar and register new avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFileAvatar');

    await updateUserAvatarService.execute({
      userId: '1',
      avatarFileName: 'avatar.jpg',
    });

    const updateAvatar = await updateUserAvatarService.execute({
      userId: '1',
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(updateAvatar.avatar).toBe('avatar2.jpg');
  });
});
