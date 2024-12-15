import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain15 } from '../domain-15.entity';

@InputType()
export class Domain15OrderInput extends OmitType(
  ToOrderInputType(Domain15),
  [],
) {}
