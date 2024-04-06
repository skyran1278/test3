import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AlsStore } from './als-store.interface';
import { als } from './als.service';

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.body?.operationName === 'IntrospectionQuery') {
      return next();
    }

    const store = {} as AlsStore;
    als.run(store, next);
  }
}
