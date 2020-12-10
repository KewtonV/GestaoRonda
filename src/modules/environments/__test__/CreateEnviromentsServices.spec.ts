import FakeEnvironmentsRepository from '@modules/environments/repositories/fakes/FakeEnvironmentsRepository';
import CreateEnviromentsServices from '@modules/environments/services/CreateEnviromentsServices';

let fakeEnvironmentsRepository: FakeEnvironmentsRepository;
let createEnviromentsServices: CreateEnviromentsServices;

describe('Create Environments Services', () => {
  beforeEach(() => {
    fakeEnvironmentsRepository = new FakeEnvironmentsRepository();
    createEnviromentsServices = new CreateEnviromentsServices(
      fakeEnvironmentsRepository,
    );
  });

  it('should be able to create a new environment', async () => {
    const data = {
      name: 'teste',
      categoriaId: 1,
      companyId: 1,
      setorId: 1,
      riscos: [1],
      procedures: [1],
      diasLimpezaId: 1,
      qtdLimpezaDia: 4,
      andar: '4º andar',
    };

    const response = await createEnviromentsServices.execute(data);

    expect(response).toHaveProperty('id');
  });
});
