import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { TypeField } from 'src/common/type-field.decorator';
import { UpdateDomain0007Input } from 'src/domain-0007/mutation/update-domain-0007.input';

import { CreateDomain0006Input } from './create-domain-0006.input';

@InputType()
export class UpdateDomain0006Input extends OmitType(
  PartialType(CreateDomain0006Input),
  [],
) {
  @Transform(({ value }: { value: unknown }) => value ?? undefined)
  @Field(() => ID, { nullable: true })
  id?: string;

  @Transform(({ value }: { value: unknown }) => value ?? undefined)
  @TypeField(() => [UpdateDomain0007Input], {
    description: 'domain0007s',
    nullable: true,
  })
  domain0007s?: UpdateDomain0007Input[];
}
