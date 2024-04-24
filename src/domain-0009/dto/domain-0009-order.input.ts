import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0009 } from '../domain-0009.entity';

@InputType()
export class Domain0009OrderInput extends OmitType(
  ToOrderInputType(Domain0009),
  [],
) {}
