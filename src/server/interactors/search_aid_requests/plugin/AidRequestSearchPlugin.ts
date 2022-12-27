import {
  CC,
  CCPluginDispatcher,
} from 'src/server/context_container/public/ContextContainer';
import { AidRequestSearchPluginType } from 'src/server/interactors/search_aid_requests/plugin/AidRequestSearchPluginType';

export const AidRequestSearchPlugin: CCPluginDispatcher<AidRequestSearchPluginType> =
  {
    getImpl(cc: CC): AidRequestSearchPluginType {
      return cc.getPlugin(AidRequestSearchPlugin);
    },
  };
