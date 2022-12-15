import { AidRequestSearchPluginType } from 'src/server/interactors/search_aid_requests/plugin/AidRequestSearchPluginType';

let PLUGIN: AidRequestSearchPluginType | undefined;

export const AidRequestSearchPlugin = {
  get(): AidRequestSearchPluginType {
    if (PLUGIN == null) {
      throw new Error('AidRequestSearchPlugin plugin not set');
    }
    return PLUGIN;
  },
  set(plugin: AidRequestSearchPluginType): void {
    PLUGIN = plugin;
  },
};
