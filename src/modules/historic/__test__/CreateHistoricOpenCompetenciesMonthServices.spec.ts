import FakeHistoricOpenCompetenciesMonthRepository from '@modules/historic/repositories/fakes/FakeHistoricOpenCompetenciesMonthRepository';
import CreateHistoricOpenCompetenciesMonthServices from '@modules/historic/services/CreateHistoricOpenCompetenciesMonthServices';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';

let fakeHistoricOpenCompetenciesMonthRepository: FakeHistoricOpenCompetenciesMonthRepository;
let fakeStorageProvider: FakeStorageProvider;
let createHistoricOpenCompetenciesMonthServices: CreateHistoricOpenCompetenciesMonthServices;

describe('Create Historic Open Competencies Month Services', () => {
  beforeEach(() => {
    fakeHistoricOpenCompetenciesMonthRepository = new FakeHistoricOpenCompetenciesMonthRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createHistoricOpenCompetenciesMonthServices = new CreateHistoricOpenCompetenciesMonthServices(
      fakeHistoricOpenCompetenciesMonthRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new historic', async () => {
    const data = {
      userId: [1, 1],
      environmentId: [1, 1],
      tasksId: [1, 2],
      createdAt: ['15/10/2020', '15/10/2020'],
      updatedAt: ['15/10/2020', '15/10/2020'],
      historicFileName: ['register1.jpg', 'register2.jpg'],
    };

    const response = await createHistoricOpenCompetenciesMonthServices.execute(
      data,
    );

    expect(response).toBe('History successfully registered');
  });
});
