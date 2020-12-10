import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRespository from '@modules/users/repositories/IUserTokensRepository';

export default class UsersRepository implements IUserTokensRespository {
  private userTokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: 1,
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }

  public async delete(user: UserToken): Promise<string> {
    const findIndex = this.userTokens.findIndex(
      findUser => findUser.id === user.id,
    );
    this.userTokens[findIndex] = user;
    return 'Token deleted';
  }
}
