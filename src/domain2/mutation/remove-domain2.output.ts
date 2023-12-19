import { Field, ObjectType } from '@nestjs/graphql';

import { Domain2 } from '../domain2.entity';

@ObjectType()
export class RemoveDomain2Output {
  @Field(() => Domain2)
  domain2!: Domain2;
}
