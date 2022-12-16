import { CC } from 'src/server/context_container/public/ContextContainer';
import type { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';

export interface SharingGroupDBGatewayType {
  load(cc: CC, id: string): Promise<SharingGroupDBProxy>;
}
