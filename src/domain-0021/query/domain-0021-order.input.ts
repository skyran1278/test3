import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0021 } from '../domain-0021.entity';

@InputType()
export class Domain0021OrderInput extends OmitType(
  ToOrderInputType(Domain0021),
  [],
) {}
