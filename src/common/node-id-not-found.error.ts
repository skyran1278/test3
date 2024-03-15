import { Type } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { MetaEntity } from './meta.entity';

export class NodeIdNotFoundError<
  Entity extends MetaEntity,
> extends GraphQLError {
  constructor(entityType: Type<Entity>, id: string, errors?: readonly Error[]) {
    super(`Could not resolve to a ${entityType.name} with the id of '${id}'`, {
      extensions: {
        entityType: entityType.name,
        id,
        errors,
      },
    });
  }
}
