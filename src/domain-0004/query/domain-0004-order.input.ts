import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain0004 } from '../domain-0004.entity';

@InputType()
export class Domain0004OrderInput extends OmitType(
  ToOrderInputType(Domain0004),
  [],
) {}
