import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import uploadConfig from '@config/upload';
import StorageProvider from '../model/StorageProvider';

export default class S3StorageProviders implements StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
  }

  public async saveFileAvatar(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.directory, file);
    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucketAvatar,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    return file;
  }

  public async deleteFileAvatar(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucketAvatar,
        Key: file,
      })
      .promise();
  }

  public async saveFileProcedures(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.directory, file);
    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucketProcedures,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    return file;
  }

  public async deleteFileProcedures(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucketProcedures,
        Key: file,
      })
      .promise();
  }
}
