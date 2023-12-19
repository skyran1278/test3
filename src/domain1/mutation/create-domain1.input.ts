import { Field, InputType, Int } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { CreateDomain2Input } from 'src/domain2/mutation/create-domain2.input';

@InputType()
export class CreateDomain1Input {
  @Field(() => Int, { description: 'domain1001', nullable: true })
  domain1001?: Maybe<number>;

  @Field(() => [CreateDomain2Input], { description: 'domain2s' })
  domain2s?: CreateDomain2Input[];
}
