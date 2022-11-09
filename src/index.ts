import logger, { LogLevelDesc } from 'loglevel';
import { cleanEnv, port, str } from 'envalid';
import { app } from './app';

const env = cleanEnv(process.env, {
  PORT: port({ default: 8080 }),
  LOG_LEVEL: str({
    choices: ['debug', 'info', 'warn', 'error'],
    default: 'info',
  }),
});

logger.setDefaultLevel('info');

if (env.LOG_LEVEL) {
  logger.setLevel(env.LOG_LEVEL as LogLevelDesc);
}

app.listen(env.PORT, () => {
  logger.info(`Server is running at http://localhost:${env.PORT}`);
});
