import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import MailTrapMailProvider from '@shared/container/providers/MailProvider/implementations/MailTrapMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  mail_trap: container.resolve(MailTrapMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
