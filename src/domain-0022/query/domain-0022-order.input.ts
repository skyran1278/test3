import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0022 } from '../domain-0022.entity';

@InputType()
export class Domain0022OrderInput extends OmitType(
  ToOrderInputType(Domain0022),
  [],
) {}
