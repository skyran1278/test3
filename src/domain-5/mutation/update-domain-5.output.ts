import { Field, ObjectType } from '@nestjs/graphql';

import { Domain5 } from '../domain-5.entity';

@ObjectType()
export class UpdateDomain5Output {
  @Field(() => Domain5)
  domain5!: Domain5;
}
