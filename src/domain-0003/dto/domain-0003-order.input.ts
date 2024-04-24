import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0003 } from '../domain-0003.entity';

@InputType()
export class Domain0003OrderInput extends OmitType(
  ToOrderInputType(Domain0003),
  [],
) {}
