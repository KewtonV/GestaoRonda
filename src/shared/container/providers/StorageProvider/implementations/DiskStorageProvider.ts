import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import StorageProvider from '../model/StorageProvider';

export default class DiskStorageProviders implements StorageProvider {
  public async saveFileAvatar(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.directory, file),
      path.resolve(uploadConfig.directory, 'uploads', file),
    );

    return file;
  }

  public async deleteFileAvatar(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, 'uploads', file);

    try {
      await fs.promises.stat(filePath);
    } catch (err) {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async saveFileProcedures(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.directory, file),
      path.resolve(uploadConfig.directory, 'uploads', file),
    );

    return file;
  }

  public async deleteFileProcedures(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, 'uploads', file);

    try {
      await fs.promises.stat(filePath);
    } catch (err) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
