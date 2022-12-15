import { SharingGroupDBGatewayType } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBGatewayType';

let PLUGIN: SharingGroupDBGatewayType | undefined;

export const SharingGroupDBGatewayPlugin = {
  get(): SharingGroupDBGatewayType {
    if (PLUGIN == null) {
      throw new Error('SharingGroupDBLoader plugin not set');
    }
    return PLUGIN;
  },
  set(plugin: SharingGroupDBGatewayType): void {
    PLUGIN = plugin;
  },
};
