import { Field, ObjectType } from '@nestjs/graphql';

import { Domain24 } from '../domain-24.entity';

@ObjectType()
export class RemoveDomain24Output {
  @Field(() => Domain24)
  domain24!: Domain24;
}
