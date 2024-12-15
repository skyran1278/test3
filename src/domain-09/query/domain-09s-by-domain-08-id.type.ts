import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain09 } from '../domain-09.entity';

@InterfaceType()
export abstract class Domain09sByDomain08Id {
  @Field(() => ID)
  id!: string;

  @Field(() => [Domain09], { nullable: true })
  domain09s?: Maybe<Domain09[]>;
}
