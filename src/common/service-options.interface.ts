import { User } from 'src/user/user.entity';
import { EntityManager } from 'typeorm';

export interface ServiceOptions {
  user: User;
  manager?: EntityManager;
}
