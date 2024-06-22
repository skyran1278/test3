import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain0015 } from '../domain-0015.entity';

@InputType()
export class CreateDomain0015Input extends OmitType(
  ToCreateInputType(Domain0015),
  [],
) {}
