import type { UserDBProxy } from 'src/server/entities/public/user/plugins/interfaces/UserDBProxy';

export interface UserDBGatewayType {
  load(id: string): Promise<UserDBProxy>;
}
