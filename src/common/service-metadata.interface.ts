import { User } from 'src/user/user.entity';
import { EntityManager } from 'typeorm';

export interface ServiceMetadata {
  user: User;
  manager?: EntityManager;
}
