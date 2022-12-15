import { AidRequestDBGatewayType } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBGatewayType';

let PLUGIN: AidRequestDBGatewayType | undefined;

export const AidRequestDBGateway = {
  get(): AidRequestDBGatewayType {
    if (PLUGIN == null) {
      throw new Error('AidRequestDBGateway plugin not set');
    }
    return PLUGIN;
  },
  set(plugin: AidRequestDBGatewayType): void {
    PLUGIN = plugin;
  },
};
