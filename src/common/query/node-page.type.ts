import { Field, InterfaceType } from '@nestjs/graphql';
import { NonNegativeIntResolver } from 'graphql-scalars';
import { Maybe } from 'graphql/jsutils/Maybe';

import { MetaEntity } from '../meta.entity';

@InterfaceType()
export abstract class NodePage<Node extends MetaEntity = MetaEntity> {
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

  @Field(() => NonNegativeIntResolver, {
    description: 'Total amount of nodes',
    nullable: true,
  })
  total?: Maybe<number>;

  abstract nodes: Node[];
}
