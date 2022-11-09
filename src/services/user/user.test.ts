import { Container } from 'typescript-ioc';
import { UserService } from './service';

describe('User', () => {
  it('Should get null user from undefined token', async () => {
    const svc = Container.get(UserService);
    const res = await svc.loadFromToken();
    expect(res).toBeNull();
  });

  it('Should get user from token', async () => {
    const svc = Container.get(UserService);
    const res = await svc.loadFromToken('token');
    expect(res).toEqual({ id: '1', name: 'Ironman' });
  });
});
