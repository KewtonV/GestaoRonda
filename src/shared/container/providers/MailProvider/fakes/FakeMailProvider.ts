import User from '@modules/users/infra/typeorm/entities/User';
import MailProvider from '../model/MailProvider';

interface Message {
  email: string;
}

export default class FakeMailProvider implements MailProvider {
  private messages: Message[] = [];

  public async send(user: User): Promise<void> {
    this.messages.push({ email: user.email });
  }
}
