import { UserDBGatewayType } from 'src/server/entities/public/user/plugins/interfaces/UserDBGatewayType';

let PLUGIN: UserDBGatewayType | undefined;

export const UserDBGatewayPlugin = {
  get(): UserDBGatewayType {
    if (PLUGIN == null) {
      throw new Error('UserDBGateway plugin not set');
    }
    return PLUGIN;
  },
  set(plugin: UserDBGatewayType): void {
    PLUGIN = plugin;
  },
};
