import { Field, ObjectType } from '@nestjs/graphql';

import { Domain09 } from '../domain-09.entity';

@ObjectType()
export class RemoveDomain09Output {
  @Field(() => Domain09)
  domain09!: Domain09;
}
