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
    const ctx = GqlExecutionContext.create(context);
    const gqlContext: GraphQLContext = ctx.getContext();

    const user = gqlContext.user;

    this.alsService.set('id', randomUUID());
    this.alsService.set('user', user);

    return next.handle();
  }
}
