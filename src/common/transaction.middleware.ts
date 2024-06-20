import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { runInTransaction } from 'typeorm-transactional';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction) {
    runInTransaction(next);
  }
}
