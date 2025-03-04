import { Field, ObjectType } from '@nestjs/graphql';

import { Domain24 } from '../domain-24.entity';

@ObjectType()
export class UpdateDomain24Output {
  @Field(() => Domain24)
  domain24!: Domain24;
}
