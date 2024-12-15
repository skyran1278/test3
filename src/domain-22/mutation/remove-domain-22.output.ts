import { Field, ObjectType } from '@nestjs/graphql';

import { Domain22 } from '../domain-22.entity';

@ObjectType()
export class RemoveDomain22Output {
  @Field(() => Domain22)
  domain22!: Domain22;
}
