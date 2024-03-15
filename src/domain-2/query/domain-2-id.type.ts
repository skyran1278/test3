import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain2 } from '../domain-2.entity';

@InterfaceType()
export abstract class Domain2Id {
  @Field(() => ID, { nullable: true })
  domain2Id?: Maybe<string>;

  @Field(() => Domain2, { nullable: true })
  domain2?: Maybe<Domain2>;
}
