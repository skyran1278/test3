import { Field, InputType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodeOrderEnum } from './node-order.enum';

@InputType()
export class NodeOrderInput {
  @Field(() => NodeOrderEnum, { nullable: true })
  createdAt?: Maybe<NodeOrderEnum>;

  @Field(() => NodeOrderEnum, {
    nullable: true,
    defaultValue: NodeOrderEnum.DESC,
  })
  updatedAt: Maybe<NodeOrderEnum> = NodeOrderEnum.DESC;
}
