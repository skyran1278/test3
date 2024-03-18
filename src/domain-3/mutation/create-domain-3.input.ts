import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain3 } from '../domain-3.entity';

@InputType()
export class CreateDomain3Input extends OmitType(
  ToCreateInputType(Domain3),
  ['domain2Id'],
) {}
