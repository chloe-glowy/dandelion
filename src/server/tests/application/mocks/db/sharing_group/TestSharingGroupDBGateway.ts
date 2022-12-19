import { CC } from 'src/server/context_container/public/ContextContainer';
import { SharingGroupDBGatewayType } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBGatewayType';
import { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';
import { TestSharingGroupDBProxy } from 'src/server/tests/application/mocks/db/sharing_group/TestSharingGroupDBProxy';
import { TestSharingGroupInMemoryDatabase } from 'src/server/tests/application/mocks/db/sharing_group/TestSharingGroupInMemoryDatabase';

export class TestSharingGroupDBGateway implements SharingGroupDBGatewayType {
  async load(cc: CC, id: string): Promise<SharingGroupDBProxy> {
    const testSharingGroupInMemoryDatabaseRow =
      TestSharingGroupInMemoryDatabase.get(id);
    if (testSharingGroupInMemoryDatabaseRow == null) {
      throw new Error(`SharingGroup with id ${id} not found`);
    }
    return new TestSharingGroupDBProxy(cc, testSharingGroupInMemoryDatabaseRow);
  }
}
