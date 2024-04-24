import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain0010 } from '../domain-0010.entity';

@InputType()
export class CreateDomain0010Input extends OmitType(
  ToCreateInputType(Domain0010),
  ['domain0009Id'],
) {}
