import 'reflect-metadata';
import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import StorageProvider from './model/StorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProviders from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProviders,
};

container.registerSingleton<StorageProvider>(
  'DiskStorageProvider',
  providers[uploadConfig.driver],
);
