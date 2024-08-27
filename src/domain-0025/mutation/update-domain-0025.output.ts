import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0025 } from '../domain-0025.entity';

@ObjectType()
export class UpdateDomain0025Output {
  @Field(() => Domain0025)
  domain0025!: Domain0025;
}
