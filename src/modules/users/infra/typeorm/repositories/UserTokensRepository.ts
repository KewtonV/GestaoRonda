import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(userId: string): Promise<UserToken> {
    const id: number = +userId;
    const userToken = await this.ormRepository.create({
      userId: id,
      token: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async delete(userToken: UserToken): Promise<string> {
    await this.ormRepository.delete(userToken.id);
    return 'Token deleted';
  }

  public async save(userToken: UserToken): Promise<UserToken> {
    return this.ormRepository.save(userToken);
  }
}
