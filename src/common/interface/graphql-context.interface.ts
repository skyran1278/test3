import { Request } from 'express';
import { User } from 'src/user/user.entity';
export interface GraphQLContext {
  req: Request;
  user?: User;
}
