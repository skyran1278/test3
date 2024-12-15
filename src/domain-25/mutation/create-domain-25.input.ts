import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain25 } from '../domain-25.entity';

@InputType()
export class CreateDomain25Input extends OmitType(
  ToCreateInputType(Domain25),
  [],
) {}
