import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain0006 } from '../domain-0006.entity';

@InputType()
export class CreateDomain0006Input extends OmitType(
  ToCreateInputType(Domain0006),
  ['domain0005Id'],
) {}
