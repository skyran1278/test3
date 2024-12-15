import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain22 } from '../domain-22.entity';

@InputType()
export class CreateDomain22Input extends OmitType(
  ToCreateInputType(Domain22),
  [],
) {}
