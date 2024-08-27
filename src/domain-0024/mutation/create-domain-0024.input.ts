import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain0024 } from '../domain-0024.entity';

@InputType()
export class CreateDomain0024Input extends OmitType(
  ToCreateInputType(Domain0024),
  [],
) {}
