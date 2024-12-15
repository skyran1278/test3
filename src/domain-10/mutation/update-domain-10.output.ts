import { Field, ObjectType } from '@nestjs/graphql';

import { Domain10 } from '../domain-10.entity';

@ObjectType()
export class UpdateDomain10Output {
  @Field(() => Domain10)
  domain10!: Domain10;
}
