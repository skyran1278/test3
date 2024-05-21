import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { AlsService } from '../als/als.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly alsService: AlsService) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const requestId = this.alsService.get('requestId');
    const input = this.alsService.get('input');
    const logger = new Logger(`RequestId: ${requestId}`);

    logger.log(input);

    const startTime = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          logger.log(`Duration: \x1B[33m+${Date.now() - startTime}ms\x1B[39m`),
        ),
      );
  }
}
