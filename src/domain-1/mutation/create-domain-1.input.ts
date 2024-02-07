import { InputType } from '@nestjs/graphql';
import { OmitMetaEntityType } from 'src/common/omit-meta-entity-type';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class CreateDomain1Input extends OmitMetaEntityType(Domain1, []) {}
