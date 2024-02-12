import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GraphQLContext } from '../graphql/graphql-context.interface';

export const UserDecorator = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext: GraphQLContext = ctx.getContext();
    return gqlContext.user;
  },
);
