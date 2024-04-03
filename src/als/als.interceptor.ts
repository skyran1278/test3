import { randomUUID } from 'crypto';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AlsService } from 'src/als/als.service';

import { GraphQLContext } from '../common/graphql-context.interface';

@Injectable()
export class AlsInterceptor implements NestInterceptor {
  constructor(private readonly alsService: AlsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const store = this.alsService.getStore();
    if (!store) {
      return next.handle();
    }

    const ctx = GqlExecutionContext.create(context);
    const gqlContext: GraphQLContext = ctx.getContext();

    const user = gqlContext.user;

    if (user) {
      store['id'] = randomUUID();
      store['user'] = user;
    }

    return next.handle();
  }
}
