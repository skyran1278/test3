import { EntityManager } from 'typeorm';

import { User } from '../user/user.entity';

export interface ServiceOptions {
  user: User;
  manager?: EntityManager;
}
