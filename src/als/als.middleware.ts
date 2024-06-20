import { randomUUID } from 'crypto';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AlsStore } from './als-store.interface';
import { alsService } from './als.service';

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = req.headers['X-Request-Id'] ?? randomUUID();
    res.setHeader('X-Request-Id', requestId);

    alsService.run(
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
