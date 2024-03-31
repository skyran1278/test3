import { Field, ObjectType } from '@nestjs/graphql';

import { Domain4 } from '../domain-4.entity';

@ObjectType()
export class RemoveDomain4Output {
  @Field(() => Domain4)
  domain4!: Domain4;
}
