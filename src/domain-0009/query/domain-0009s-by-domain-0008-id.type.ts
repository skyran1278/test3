import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0009 } from '../domain-0009.entity';

@InterfaceType()
export abstract class Domain0009sByDomain0008Id {
  @Field(() => ID)
  id!: string;

  @Field(() => [Domain0009], { nullable: true })
  domain0009s?: Maybe<Domain0009[]>;
}
