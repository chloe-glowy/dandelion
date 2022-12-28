import { createPluginReference } from 'src/server/context_container/public/ContextContainer';
import { AidRequestSearchPluginType } from 'src/server/interactors/search_aid_requests/plugin/AidRequestSearchPluginType';

export const AidRequestSearchPlugin =
  createPluginReference<AidRequestSearchPluginType>();
