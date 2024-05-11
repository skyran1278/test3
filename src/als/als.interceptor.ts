import { randomUUID } from 'crypto';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { AlsService } from '../als/als.service';
import { GraphQLContext } from '../common/graphql-context.interface';

@Injectable()
export class AlsInterceptor implements NestInterceptor {
  constructor(private readonly alsService: AlsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    this.alsService.set('id', randomUUID());

    const ctx = GqlExecutionContext.create(context);
    const gqlContext: GraphQLContext = ctx.getContext();
    const user = gqlContext.user;
    if (user) {
      this.alsService.set('user', user);
    }

    return next.handle();
  }
}
