import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain5 } from '../domain-5.entity';

@InputType()
export class CreateDomain5Input extends OmitType(
  ToCreateInputType(Domain5),
  [],
) {}
