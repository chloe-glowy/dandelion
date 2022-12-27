import {
  CC,
  CCPluginDispatcher,
} from 'src/server/context_container/public/ContextContainer';
import { AidRequestDBGatewayType } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBGatewayType';

export const AidRequestDBGatewayPlugin: CCPluginDispatcher<AidRequestDBGatewayType> =
  {
    getImpl(cc: CC): AidRequestDBGatewayType {
      return cc.getPlugin(AidRequestDBGatewayPlugin);
    },
  };
