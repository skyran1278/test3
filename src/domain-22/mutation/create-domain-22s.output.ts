import { Field, ObjectType } from '@nestjs/graphql';

import { Domain22 } from '../domain-22.entity';

@ObjectType()
export class CreateDomain22sOutput {
  @Field(() => [Domain22])
  domain22s!: Domain22[];
}
