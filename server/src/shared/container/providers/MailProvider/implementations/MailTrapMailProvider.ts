import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import mailConfig from '@config/mail';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import AppError from '@shared/errors/AppError';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const { host, port, secure, auth } = mailConfig;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth,
    });

    this.client = transporter;
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    try {
      await this.client.sendMail({
        from: {
          name: from?.name || 'Equipe GoBarber',
          address: from?.email || 'equipe@gobarber.com.br',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });
    } catch (err) {
      throw new AppError('Failed to send e-mail.');
    }

    // console.log(message);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
