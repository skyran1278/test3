import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain0002 } from '../domain-0002.entity';

@InputType()
export class Domain0002OrderInput extends OmitType(
  ToOrderInputType(Domain0002),
  [],
) {}
