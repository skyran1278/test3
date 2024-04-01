import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain0011 } from '../domain-0011.entity';

@InputType()
export class Domain0011OrderInput extends OmitType(
  ToOrderInputType(Domain0011),
  [],
) {}
