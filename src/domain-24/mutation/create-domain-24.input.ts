import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain24 } from '../domain-24.entity';

@InputType()
export class CreateDomain24Input extends OmitType(
  ToCreateInputType(Domain24),
  [],
) {}
