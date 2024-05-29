import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0008 } from '../domain-0008.entity';

@InputType()
export class Domain0008OrderInput extends OmitType(
  ToOrderInputType(Domain0008),
  [],
) {}
