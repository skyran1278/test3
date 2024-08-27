import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0024 } from '../domain-0024.entity';

@ObjectType()
export class UpdateDomain0024Output {
  @Field(() => Domain0024)
  domain0024!: Domain0024;
}
