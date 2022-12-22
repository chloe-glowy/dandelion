import { CC } from 'src/server/context_container/public/ContextContainer';
import { UserCreateArgs } from 'src/server/entities/public/user/mutations/UserCreate';
import type { UserDBProxy } from 'src/server/entities/public/user/plugins/interfaces/UserDBProxy';
import { User } from 'src/server/entities/public/user/User';

export interface UserDBGatewayType {
  load(id: string): Promise<UserDBProxy | null>;
  create(cc: CC, args: UserCreateArgs): Promise<User>;
}
