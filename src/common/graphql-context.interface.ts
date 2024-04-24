import { Request } from 'express';

import { User } from '../user/user.entity';
export interface GraphQLContext {
  req: Request;
  user?: User;
}
