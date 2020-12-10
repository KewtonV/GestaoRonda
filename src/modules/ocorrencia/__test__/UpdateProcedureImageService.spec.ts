import FakeProceduresRepository from '@modules/procedures/repositories/fakes/FakeProceduresRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import UpdateProcedureImageService from '@modules/procedures/services/UpdateProcedureImageService';

let fakeProceduresRepository: FakeProceduresRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateProcedureImageService: UpdateProcedureImageService;

describe('Reset Password Service', () => {
  beforeEach(() => {
    fakeProceduresRepository = new FakeProceduresRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateProcedureImageService = new UpdateProcedureImageService(
      fakeProceduresRepository,
      fakeStorageProvider,
    );
  });

  it('should be able update procedure image', async () => {
    const procedure = await fakeProceduresRepository.create({
      name: 'teste',
      companyId: 1,
    });
    const updateImage = await updateProcedureImageService.execute({
      procedureId: procedure.id.toString(),
      procedureFileName: 'procedure.jpg',
    });

    expect(updateImage.image).toBe('procedure.jpg');
  });

  it('should be able delete avatar and register new avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFileProcedures');

    const responseCreateProcedure = await fakeProceduresRepository.create({
      name: 'teste',
      companyId: 1,
    });

    await updateProcedureImageService.execute({
      procedureId: responseCreateProcedure.id.toString(),
      procedureFileName: 'procedure.jpg',
    });

    const updateImage = await updateProcedureImageService.execute({
      procedureId: responseCreateProcedure.id.toString(),
      procedureFileName: 'procedure2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('procedure.jpg');
    expect(updateImage.image).toBe('procedure2.jpg');
  });
});
