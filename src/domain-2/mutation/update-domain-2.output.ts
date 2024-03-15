import { Field, ObjectType } from '@nestjs/graphql';

import { Domain2 } from '../domain-2.entity';

@ObjectType()
export class UpdateDomain2Output {
  @Field(() => Domain2)
  domain2!: Domain2;
}
