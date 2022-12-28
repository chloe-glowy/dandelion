import { createPluginReference } from 'src/server/context_container/public/ContextContainer';
import { SharingGroupDBGatewayType } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBGatewayType';

export const SharingGroupDBGatewayPlugin =
  createPluginReference<SharingGroupDBGatewayType>();
