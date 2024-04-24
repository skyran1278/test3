import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0007 } from '../domain-0007.entity';

@InputType()
export class Domain0007OrderInput extends OmitType(
  ToOrderInputType(Domain0007),
  [],
) {}
