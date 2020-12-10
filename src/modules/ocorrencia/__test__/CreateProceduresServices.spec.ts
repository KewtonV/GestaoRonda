import FakeProceduresRepository from '@modules/procedures/repositories/fakes/FakeProceduresRepository';
import CreateProceduresServices from '@modules/procedures/services/CreateProceduresServices';

let fakeProceduresRepository: FakeProceduresRepository;
let createProceduresServices: CreateProceduresServices;

describe('Create Procedures Services', () => {
  beforeEach(() => {
    fakeProceduresRepository = new FakeProceduresRepository();
    createProceduresServices = new CreateProceduresServices(
      fakeProceduresRepository,
    );
  });

  it('should be able to create a new procedure', async () => {
    const data = {
      name: 'Teste',
      environmentId: 1,
    };

    const response = await createProceduresServices.execute(data);

    expect(response).toHaveProperty('id');
  });
});
