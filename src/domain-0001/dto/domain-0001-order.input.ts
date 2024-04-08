import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class Domain0001OrderInput extends OmitType(
  ToOrderInputType(Domain0001),
  [],
) {}
