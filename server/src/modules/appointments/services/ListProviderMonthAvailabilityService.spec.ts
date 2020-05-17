import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeAll(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 17, 8, 0, 0),
    });

    await Promise.all(
      Array.from({ length: 10 }, (_, index) => {
        return fakeAppointmentsRepository.create({
          provider_id: 'user',
          date: new Date(2020, 4, 17, index + 8, 0, 0),
        });
      }),
    );

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 18, 9, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 16, available: true },
        { day: 17, available: false },
        { day: 18, available: true },
        { day: 19, available: true },
      ]),
    );
  });
});
