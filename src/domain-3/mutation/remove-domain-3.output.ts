import { Field, ObjectType } from '@nestjs/graphql';

import { Domain3 } from '../domain-3.entity';

@ObjectType()
export class RemoveDomain3Output {
  @Field(() => Domain3)
  domain3!: Domain3;
}
