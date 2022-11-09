import express, { Application } from 'express';
import swaggerUi, { JsonObject, SwaggerUiOptions } from 'swagger-ui-express';
import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '../server';

import pkg from '../../package.json';

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: pkg.name,
  version: pkg.version,
  baseUrl: 'http://localhost:8080',
});

openApiDocument.info['x-logo'] = '/logo.png';
openApiDocument.info['x-favicon'] = '/favicon.ico';
openApiDocument.info.description = pkg.description;

export function RegisterDocs(app: Application) {
  app.use(express.static('public'));
  app.use('/docs', swaggerUi.serve, async (_, res) => {
    const html = generateHTML(openApiDocument);
    return res.send(html);
  });
}

function generateHTML(doc: JsonObject) {
  const opts: SwaggerUiOptions = {};
  opts.customSiteTitle = doc.info.title;
  if (doc.info['x-logo']) {
    opts.customCss = `.swagger-ui img { content: url(${doc.info['x-logo']}); }`;
  }
  if (doc.info['x-favicon']) {
    opts.customfavIcon = doc.info['x-favicon'];
  }
  return swaggerUi.generateHTML(doc, opts);
}
