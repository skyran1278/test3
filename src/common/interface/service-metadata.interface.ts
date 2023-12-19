import { User } from 'src/user/user.entity';
import { EntityManager } from 'typeorm';

import { IGraphQLContext } from './graphql-context.interface';

export interface ServiceMetadata {
  user: User;
  context?: IGraphQLContext;
  manager?: EntityManager;
}
