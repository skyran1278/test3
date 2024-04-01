import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0005 } from '../domain-0005.entity';

@ObjectType()
export class UpdateDomain0005Output {
  @Field(() => Domain0005)
  domain0005!: Domain0005;
}
