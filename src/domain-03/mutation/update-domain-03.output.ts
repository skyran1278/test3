import { Field, ObjectType } from '@nestjs/graphql';

import { Domain03 } from '../domain-03.entity';

@ObjectType()
export class UpdateDomain03Output {
  @Field(() => Domain03)
  domain03!: Domain03;
}
