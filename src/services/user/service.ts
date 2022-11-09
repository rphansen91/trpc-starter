import { Singleton } from 'typescript-ioc';
import { User } from './user';

@Singleton
export class UserService {
  async loadFromToken(token?: string): Promise<User | null> {
    if (!token) return null;

    return {
      id: '1',
      name: 'Ironman',
    };
  }

  getUser(id: string) {
    return {
      id,
      name: 'Ironman',
    };
  }
}
