import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0010 } from '../domain-0010.entity';

@ObjectType()
export class UpdateDomain0010Output {
  @Field(() => Domain0010)
  domain0010!: Domain0010;
}
