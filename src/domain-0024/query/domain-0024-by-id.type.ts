import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0024 } from '../domain-0024.entity';

@InterfaceType()
export abstract class Domain0024ById {
  @Field(() => ID, { nullable: true })
  domain0024Id?: Maybe<string>;

  @Field(() => Domain0024, { nullable: true })
  domain0024?: Maybe<Domain0024>;
}
