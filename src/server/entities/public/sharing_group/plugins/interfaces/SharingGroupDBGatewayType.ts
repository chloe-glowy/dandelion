import type { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';

export interface SharingGroupDBGatewayType {
  load(id: string): Promise<SharingGroupDBProxy>;
}
