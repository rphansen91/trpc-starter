import { initTRPC } from '@trpc/server';
import { healthRouter } from './routers/health';
import { userRouter } from './routers/user';

export const appRouter = initTRPC.create().mergeRouters(healthRouter, userRouter);

export type AppRouter = typeof appRouter;
