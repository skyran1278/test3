import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain08 } from '../domain-08.entity';

@InputType()
export class Domain08OrderInput extends OmitType(
  ToOrderInputType(Domain08),
  [],
) {}
