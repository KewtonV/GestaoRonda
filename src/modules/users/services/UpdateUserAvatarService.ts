import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import RequestUpdateUserAvatarService from '@modules/users/services/intefaces/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';
import StorageProvider from '@shared/container/providers/StorageProvider/model/StorageProvider';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('DiskStorageProvider')
    private storageProvider: StorageProvider,
  ) {}

  public async execute({
    userId,
    avatarFileName,
  }: RequestUpdateUserAvatarService): Promise<User> {
    const id: number = +userId;
    const user = await this.usersRepository.findById(id.toString());

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFileAvatar(user.avatar);
    }
    const filename = await this.storageProvider.saveFileAvatar(avatarFileName);
    user.avatar = filename;
    await this.usersRepository.save(user);

    return user;
  }
}
