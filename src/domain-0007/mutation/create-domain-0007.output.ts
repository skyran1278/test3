import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0007 } from '../domain-0007.entity';

@ObjectType()
export class CreateDomain0007Output {
  @Field(() => Domain0007)
  domain0007!: Domain0007;
}
