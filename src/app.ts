import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import { RegisterDocs } from './utils/docs';
import { handleError } from './utils/errors';
import { appRouter } from './server';
import { createContext } from './context';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createOpenApiExpressMiddleware } from 'trpc-openapi';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(responseTime());
app.use(morgan('tiny'));
// app.use(cors());

RegisterDocs(app);

app.use(
  createOpenApiExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use(handleError);
