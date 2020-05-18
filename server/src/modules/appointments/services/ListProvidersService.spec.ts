import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@email.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Catre',
      email: 'johncatre@email.com',
      password: '123123',
    });

    const allProvidersButLoggedUser = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(allProvidersButLoggedUser).toEqual([user1, user2]);
  });
});
