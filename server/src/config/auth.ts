import { Secret } from 'jsonwebtoken';

interface IAuthConfig {
  jwt: {
    secret: Secret;
    expiresIn: string;
  };
}

export default {
  jwt: {
    secret: process.env.AWS_ACCESS_KEY_ID || 'something',
    expiresIn: '1d',
  },
} as IAuthConfig;
