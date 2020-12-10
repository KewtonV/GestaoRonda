import User from '@modules/users/infra/typeorm/entities/User';

export default interface MailProvider {
  send(user: User, token: string): Promise<void>;
}
