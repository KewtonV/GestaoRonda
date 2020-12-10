import AppError from '@shared/errors/AppError';
import FakeProceduresRepository from '@modules/procedures/repositories/fakes/FakeProceduresRepository';
import UpdateProceduresService from '@modules/procedures/services/UpdateProceduresService';

let fakeProceduresRepository: FakeProceduresRepository;
let updateProcedurestsService: UpdateProceduresService;

describe('UpdateProcedureService', () => {
  beforeEach(async () => {
    fakeProceduresRepository = new FakeProceduresRepository();
    updateProcedurestsService = new UpdateProceduresService(
      fakeProceduresRepository,
    );

    await fakeProceduresRepository.create({
      name: 'Limpar vaso',
      procudureId: 1,
    });
  });

  it('should be able to update procedure', async () => {
    const data = {
      procudureId: 1,
      name: 'Banheiro',
    };

    const response = await updateProcedurestsService.execute(data);

    expect(response).toHaveProperty('id');
  });

  it('should return error if id not found', async () => {
    const data = {
      procudureId: 2,
      name: 'Teste',
    };

    expect(updateProcedurestsService.execute(data)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
