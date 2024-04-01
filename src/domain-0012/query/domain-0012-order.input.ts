import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain0012 } from '../domain-0012.entity';

@InputType()
export class Domain0012OrderInput extends OmitType(
  ToOrderInputType(Domain0012),
  [],
) {}
