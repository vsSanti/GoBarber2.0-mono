interface IAuth {
  user: string;
  pass: string;
}

interface IMailConfig {
  driver: 'ethereal' | 'mail_trap';
  host: string;
  port: string;
  secure: boolean;
  auth: IAuth;
}

export default {
  driver: process.env.MAIL_DRIVER || 'mail_trap',

  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as IMailConfig;
