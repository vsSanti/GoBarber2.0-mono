import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
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
