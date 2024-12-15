import { Field, ObjectType } from '@nestjs/graphql';

import { Domain21 } from '../domain-21.entity';

@ObjectType()
export class UpdateDomain21Output {
  @Field(() => Domain21)
  domain21!: Domain21;
}
