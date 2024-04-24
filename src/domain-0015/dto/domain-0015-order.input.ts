import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0015 } from '../domain-0015.entity';

@InputType()
export class Domain0015OrderInput extends OmitType(
  ToOrderInputType(Domain0015),
  [],
) {}
