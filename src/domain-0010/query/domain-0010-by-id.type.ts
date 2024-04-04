import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0010 } from '../domain-0010.entity';

@InterfaceType()
export abstract class Domain0010ById {
  @Field(() => ID, { nullable: true })
  domain0010Id?: Maybe<string>;

  @Field(() => Domain0010, { nullable: true })
  domain0010?: Maybe<Domain0010>;
}
