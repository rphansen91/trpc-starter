import { TRPCError } from '@trpc/server';
import { Request, Response, NextFunction } from 'express';
import logger from 'loglevel';

export class UnauthorizedError extends TRPCError {
  constructor() {
    super({
      code: 'UNAUTHORIZED',
    });
  }
}

export function handleError(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Error) {
    logger.error('Unknown error', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
}
