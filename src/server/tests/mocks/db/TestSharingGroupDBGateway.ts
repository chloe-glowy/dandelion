import { SharingGroupDBGatewayType } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBGatewayType';
import { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';

export class TestSharingGroupDBGateway implements SharingGroupDBGatewayType {
  async load(_id: string): Promise<SharingGroupDBProxy> {
    throw new Error('Not yet implemented');
  }
}
