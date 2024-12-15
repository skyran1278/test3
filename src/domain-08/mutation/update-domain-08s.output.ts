import { Field, ObjectType } from '@nestjs/graphql';

import { Domain08 } from '../domain-08.entity';

@ObjectType()
export class UpdateDomain08sOutput {
  @Field(() => [Domain08])
  domain08s!: Domain08[];
}
