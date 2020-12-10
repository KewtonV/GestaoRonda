export default interface StorageProvider {
  saveFileAvatar(file: string): Promise<string>;
  deleteFileAvatar(file: string): Promise<void>;
  saveFileProcedures(file: string): Promise<string>;
  deleteFileProcedures(file: string): Promise<void>;
}
