import AppError from '@shared/errors/AppError';
import FakeEnvironmentsRepository from '@modules/environments/repositories/fakes/FakeEnvironmentsRepository';
import UpdateEnvironmentsService from '@modules/environments/services/UpdateEnvironmentsService';

let fakeEnvironmentsRepository: FakeEnvironmentsRepository;
let updateEnvironmentsService: UpdateEnvironmentsService;

describe('UpdateEnvironmentService', () => {
  beforeEach(async () => {
    fakeEnvironmentsRepository = new FakeEnvironmentsRepository();
    updateEnvironmentsService = new UpdateEnvironmentsService(
      fakeEnvironmentsRepository,
    );

    await fakeEnvironmentsRepository.create({
      categoriaId: 1,
      companyId: 1,
      setorId: 1,
      diasLimpezaId: 1,
      qtdLimpezaDia: 4,
      andar: '4º andar',
    });
  });

  it('should be able to update environments', async () => {
    const data = {
      environmentId: 1,
      name: 'Banheiro',
    };

    const response = await updateEnvironmentsService.execute(data);

    expect(response).toHaveProperty('id');
  });

  it('should return error if id not found', async () => {
    const data = {
      environmentId: 2,
      name: 'Teste',
    };

    expect(updateEnvironmentsService.execute(data)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
