import FakeHistoricOpenCompetenciesMonthRepository from '@modules/historic/repositories/fakes/FakeHistoricOpenCompetenciesMonthRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import UpdateHistoryOpenCompetenciesMonthServiceImage from '@modules/historic/services/UpdateHistoryOpenCompetenciesMonthServiceImage';

let fakeHistoricOpenCompetenciesMonthRepository: FakeHistoricOpenCompetenciesMonthRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateHistoryOpenCompetenciesMonthServiceImage: UpdateHistoryOpenCompetenciesMonthServiceImage;

describe('Reset Password Service', () => {
  beforeEach(() => {
    fakeHistoricOpenCompetenciesMonthRepository = new FakeHistoricOpenCompetenciesMonthRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateHistoryOpenCompetenciesMonthServiceImage = new UpdateHistoryOpenCompetenciesMonthServiceImage(
      fakeHistoricOpenCompetenciesMonthRepository,
      fakeStorageProvider,
    );
  });

  it('should be able update procedure image', async () => {
    await fakeHistoricOpenCompetenciesMonthRepository.create({
      userId: 1,
      environmentId: 1,
      tasksId: 2,
      createdAt: '15/10/2020',
      updatedAt: '15/10/2020',
    });
    const updateImage = await updateHistoryOpenCompetenciesMonthServiceImage.execute(
      {
        historicId: 1,
        historicFileName: 'historic.jpg',
      },
    );

    expect(updateImage.image).toBe('historic.jpg');
  });

  it('should be able delete avatar and register new avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFileProcedures');

    await fakeHistoricOpenCompetenciesMonthRepository.create({
      userId: 1,
      environmentId: 1,
      tasksId: 2,
      createdAt: '15/10/2020',
      updatedAt: '15/10/2020',
    });

    await updateHistoryOpenCompetenciesMonthServiceImage.execute({
      historicId: 1,
      historicFileName: 'historic.jpg',
    });

    const updateImage = await updateHistoryOpenCompetenciesMonthServiceImage.execute(
      {
        historicId: 1,
        historicFileName: 'historic2.jpg',
      },
    );

    expect(deleteFile).toHaveBeenCalledWith('historic.jpg');
    expect(updateImage.image).toBe('historic2.jpg');
  });
});
