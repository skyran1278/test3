import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain0005 } from '../domain-0005.entity';

@InputType()
export class CreateDomain0005Input extends OmitType(ToCreateInputType(Domain0005), [
  'domain0004Id',
]) {}
