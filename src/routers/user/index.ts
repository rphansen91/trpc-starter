import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { Container } from 'typescript-ioc';
import { UserService } from '../../services/user/service';
import { UnauthorizedError } from '../../utils/errors';
import { Context } from '../../context';
import z from 'zod';

const t = initTRPC.meta<OpenApiMeta>().context<Context>().create();
const svc = Container.get<UserService>(UserService);

const zUser = z.object({ id: z.string(), name: z.string() });

export const userRouter = t.router({
  user: t.procedure
    .meta({ openapi: { method: 'GET', path: '/user', enabled: true, protect: true } })
    .input(z.void({}))
    .output(zUser)
    .query(({ ctx }) => {
      if (!ctx.user) throw new UnauthorizedError();
      return ctx.user;
    }),

  getUserById: t.procedure
    .meta({ openapi: { method: 'GET', path: '/user/{id}', enabled: true } })
    .input(z.object({ id: z.string() }))
    .output(zUser)
    .query(({ input }) => svc.getUser(input.id)),
});
