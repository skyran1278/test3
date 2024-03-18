import { ArgsType, Field } from '@nestjs/graphql';
import { NonNegativeIntResolver } from 'graphql-scalars';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodeOrderInput } from './node-order.input';

@ArgsType()
export abstract class NodePageArgs {
  @Field(() => NonNegativeIntResolver, {
    description: 'Maximum amount of nodes in this page',
    nullable: true,
  })
  take?: Maybe<number>;

  @Field(() => NonNegativeIntResolver, {
    description: 'Amount of nodes to skip from the beginning of this page',
    nullable: true,
  })
  skip?: Maybe<number>;

  abstract order: NodeOrderInput;
  abstract where?: unknown;
}
