import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { runInTransaction } from 'typeorm-transactional';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.body?.operationName === 'IntrospectionQuery') {
      return next();
    }
    runInTransaction(next);
  }
}
