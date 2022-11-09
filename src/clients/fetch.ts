import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import fetch from 'isomorphic-fetch';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      fetch,
      url: process.env.AXE_NFT_SERVICE || 'http://localhost:8080/trpc',
    }),
  ],
});
