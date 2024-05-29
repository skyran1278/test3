import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0008 } from '../domain-0008.entity';

@InterfaceType()
export abstract class Domain0008ById {
  @Field(() => ID, { nullable: true })
  domain0008Id?: Maybe<string>;

  @Field(() => Domain0008, { nullable: true })
  domain0008?: Maybe<Domain0008>;
}
