import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AlsStore } from './als-store.interface';
import { als } from './als.module';

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction) {
    const store = {} as AlsStore;
    als.run(store, () => next());
  }
}
