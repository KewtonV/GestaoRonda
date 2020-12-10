import StorageProvider from '../model/StorageProvider';

export default class FakeStorageProvider implements StorageProvider {
  private storage: string[] = [];

  public async saveFileAvatar(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFileAvatar(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }

  public async saveFileProcedures(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFileProcedures(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }
}
