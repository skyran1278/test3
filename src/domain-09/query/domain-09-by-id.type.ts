import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain09 } from '../domain-09.entity';

@InterfaceType()
export abstract class Domain09ById {
  @Field(() => ID, { nullable: true })
  domain09Id?: Maybe<string>;

  @Field(() => Domain09, { nullable: true })
  domain09?: Maybe<Domain09>;
}
