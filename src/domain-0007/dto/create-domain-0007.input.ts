import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain0007 } from '../domain-0007.entity';

@InputType()
export class CreateDomain0007Input extends OmitType(
  ToCreateInputType(Domain0007),
  ['domain0006Id'],
) {}
