import { Request } from 'express';
import { User } from 'src/user/user.entity';
export interface IGraphQLContext {
  req: Request;
  user?: User;
}
