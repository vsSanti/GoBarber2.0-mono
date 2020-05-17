import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tmpFolder, 'uploads');

interface IUploadCOnfig {
  driver: 'disk' | 's3';

  tmpFolder: string;
  uploadsFolder: string;

  config: {
    disk: {
      storage: StorageEngine;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tmpFolder,
  uploadsFolder,

  config: {
    disk: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename(_, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('HEX');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    },
  },
} as IUploadCOnfig;
