import { User } from 'src/user/user.entity';
import { EntityManager } from 'typeorm';

import { GraphQLContext } from './graphql/graphql-context.interface';

export interface ServiceMetadata {
  user: User;
  context?: GraphQLContext;
  manager?: EntityManager;
}
