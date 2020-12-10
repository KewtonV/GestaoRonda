import { inject, injectable } from 'tsyringe';

import Procedures from '@modules/ocorrencia/infra/typeorm/entities/Ocorrencia';
import RequestUpdateProcedureImageService from '@modules/ocorrencia/services/intefaces/RequestUpdateOcorrenciaImageService';
import StorageProvider from '@shared/container/providers/StorageProvider/model/StorageProvider';
import IProcedureRepository from '@modules/ocorrencia/repositories/IOcorrenciaRepository';

@injectable()
export default class UpdateProcedureImageService {
  constructor(
    @inject('ProcedureRepository')
    private procedureRepository: IProcedureRepository,

    @inject('DiskStorageProvider')
    private storageProvider: StorageProvider,
  ) {}

  public async execute({
    procedureId,
    procedureFileName,
  }: RequestUpdateProcedureImageService): Promise<Procedures> {
    const id: number = +procedureId;
    const procedure = await this.procedureRepository.findById(id);

    if (procedure.image) {
      await this.storageProvider.deleteFileProcedures(procedure.image);
    }
    const filename = await this.storageProvider.saveFileProcedures(
      procedureFileName,
    );
    procedure.image = filename;
    procedure.imageUrl = `https://168f97615ddd.ngrok.io/files/${filename}`;
    await this.procedureRepository.save(procedure);

    return procedure;
  }
}
