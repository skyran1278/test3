import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0015 } from '../domain-0015.entity';

@InterfaceType()
export abstract class Domain0015Id {
  @Field(() => ID, { nullable: true })
  domain0015Id?: Maybe<string>;

  @Field(() => Domain0015, { nullable: true })
  domain0015?: Maybe<Domain0015>;
}
