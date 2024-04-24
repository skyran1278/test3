import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0010 } from '../domain-0010.entity';

@InputType()
export class Domain0010OrderInput extends OmitType(
  ToOrderInputType(Domain0010),
  [],
) {}
