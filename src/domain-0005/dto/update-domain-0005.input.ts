import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

import { TypeField } from '../../common/type-field.decorator';
import { UpdateDomain0006Input } from '../../domain-0006/dto/update-domain-0006.input';
import { CreateDomain0005Input } from './create-domain-0005.input';

@InputType()
export class UpdateDomain0005Input extends OmitType(
  PartialType(CreateDomain0005Input),
  ['domain0006s'],
) {
  @Transform(({ value }: { value: unknown }) => value ?? undefined)
  @Field(() => ID, { nullable: true })
  id?: string;

  @Transform(({ value }: { value: unknown }) => value ?? undefined)
  @TypeField(() => [UpdateDomain0006Input], {
    description: 'domain0006s',
    nullable: true,
  })
  domain0006s?: UpdateDomain0006Input[];
}
