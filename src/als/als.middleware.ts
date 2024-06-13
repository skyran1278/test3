import { randomUUID } from 'crypto';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AlsStore } from './als-store.interface';
import { als } from './als.service';

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Not need.
    // We recommend disabling introspection when using Apollo Server in a production environment.
    // if (req.body?.operationName === 'IntrospectionQuery') {
    //   return next();
    // }

    const requestId = req.headers['X-Request-Id'] ?? randomUUID();
    res.setHeader('X-Request-Id', requestId);

    als.run(
      {
        requestId,
        input: JSON.stringify({
          originalUrl: req.originalUrl,
          body: req.body as unknown,
        }),
      } as AlsStore,
      next,
    );
  }
}
