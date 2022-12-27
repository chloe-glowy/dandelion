import {
  CC,
  CCPluginDispatcher,
} from 'src/server/context_container/public/ContextContainer';
import { UserDBGatewayType } from 'src/server/entities/public/user/plugins/interfaces/UserDBGatewayType';

export const UserDBGatewayPlugin: CCPluginDispatcher<UserDBGatewayType> = {
  getImpl(cc: CC): UserDBGatewayType {
    return cc.getPlugin(UserDBGatewayPlugin);
  },
};
