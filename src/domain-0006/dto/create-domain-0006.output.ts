import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0006 } from '../domain-0006.entity';

@ObjectType()
export class CreateDomain0006Output {
  @Field(() => Domain0006)
  domain0006!: Domain0006;
}
