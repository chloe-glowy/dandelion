import { createPluginReference } from 'src/server/context_container/public/ContextContainer';
import { AidRequestDBGatewayType } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBGatewayType';

export const AidRequestDBGatewayPlugin =
  createPluginReference<AidRequestDBGatewayType>();
