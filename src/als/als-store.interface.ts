import { User } from '../user/user.entity';

export interface AlsStore {
  id?: string;
  user?: User;
  // input: Record<string, unknown>;
}
