import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestCreateArgs } from 'src/server/entities/public/aid_request/mutations/AidRequestCreate';
import { AidRequestDBGatewayType } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBGatewayType';
import { AidRequestDBProxy } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBProxy';
import { TestAidRequestDBProxy } from 'src/server/tests/mocks/db/aid_request/TestAidRequestDBProxy';
import { TestAidRequestInMemoryDatabase } from 'src/server/tests/mocks/db/aid_request/TestAidRequestInMemoryDatabase';

export class TestAidRequestDBGateway implements AidRequestDBGatewayType {
  async load(cc: CC, id: string): Promise<AidRequestDBProxy> {
    const testAidRequestInMemoryDatabaseRow =
      TestAidRequestInMemoryDatabase.get(id);
    if (testAidRequestInMemoryDatabaseRow == null) {
      throw new Error(`AidRequest with id ${id} not found`);
    }
    return new TestAidRequestDBProxy(cc, testAidRequestInMemoryDatabaseRow);
  }

  async create(_cc: CC, _args: AidRequestCreateArgs): Promise<AidRequest> {
    throw new Error('TestAidRequestDBGateway.create -- Not implemented');
  }
}
