import { container } from 'tsyringe';

import MailProvider from './model/MailProvider';
import SendMailProvider from './implementations/MailProvider';

container.registerSingleton<MailProvider>('SendMailProvider', SendMailProvider);
