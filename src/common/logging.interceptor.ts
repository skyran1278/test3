import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

import { AlsService } from '../als/als.service';
import { GraphQLContext } from './graphql-context.interface';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly alsService: AlsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const requestId = this.alsService.get('requestId');
    const logger = new Logger(`RequestId: ${requestId}`);

    const ctx = GqlExecutionContext.create(context);
    const gqlContext: GraphQLContext = ctx.getContext();

    logger.log(JSON.stringify(gqlContext.req?.body));

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
