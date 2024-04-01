import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain0003 } from '../domain-0003.entity';

@InputType()
export class CreateDomain0003Input extends OmitType(
  ToCreateInputType(Domain0003),
  ['domain0002Id'],
) {}
