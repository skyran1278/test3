import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain15 } from '../domain-15.entity';

@InputType()
export class CreateDomain15Input extends OmitType(
  ToCreateInputType(Domain15),
  [],
) {}
