import { User } from 'src/user/user.entity';

export interface AlsStore {
  id?: string;
  user?: User;
  // input: Record<string, unknown>;
}
