import { Field, ObjectType } from '@nestjs/graphql';

import { Domain08 } from '../domain-08.entity';

@ObjectType()
export class UpdateDomain08Output {
  @Field(() => Domain08)
  domain08!: Domain08;
}
