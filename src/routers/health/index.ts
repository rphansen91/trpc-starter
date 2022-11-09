import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import z from 'zod';

const t = initTRPC.meta<OpenApiMeta>().create();

export const healthRouter = t.router({
  healthy: t.procedure
    .meta({ openapi: { method: 'GET', path: '/healthy', enabled: true } })
    .input(z.void({}))
    .output(z.boolean())
    .query(() => {
      return true;
    }),
});
