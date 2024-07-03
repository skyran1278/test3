import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0021 } from '../domain-0021.entity';

@InterfaceType()
export abstract class Domain0021ById {
  @Field(() => ID, { nullable: true })
  domain0021Id?: Maybe<string>;

  @Field(() => Domain0021, { nullable: true })
  domain0021?: Maybe<Domain0021>;
}
