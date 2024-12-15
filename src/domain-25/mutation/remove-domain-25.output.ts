import { Field, ObjectType } from '@nestjs/graphql';

import { Domain25 } from '../domain-25.entity';

@ObjectType()
export class RemoveDomain25Output {
  @Field(() => Domain25)
  domain25!: Domain25;
}
