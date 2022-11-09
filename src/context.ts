import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { Container } from 'typescript-ioc';
import { UserService } from './services/user/service';

const svc = Container.get<UserService>(UserService);

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const token = req.headers.authorization;
  const user = await svc.loadFromToken(token);
  return {
    req,
    res,
    user,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
