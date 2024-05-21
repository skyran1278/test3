import { User } from '../user/user.entity';

export interface AlsStore {
  requestId: string;
  user: User;
  input: Record<string, unknown>;
}
