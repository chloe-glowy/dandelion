import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestCreateArgs } from 'src/server/entities/public/aid_request/mutations/AidRequestCreate';
import { AidRequestDBGatewayType } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBGatewayType';
import { AidRequestDBProxy } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBProxy';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { TestAidRequestHistoryEventDBProxyFactory } from 'src/server/tests/application/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxyFactory';
import { TestAidRequestDBProxy } from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestDBProxy';
import { TestAidRequestInMemoryDatabase } from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestInMemoryDatabase';
import {
  TestAidRequestInMemoryDatabaseRow,
  TestAidRequestInMemoryDatabaseRowProperties,
} from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestInMemoryDatabaseRow';
import { TestID } from 'src/server/tests/application/mocks/TestID';

export class TestAidRequestDBGateway implements AidRequestDBGatewayType {
  async load(cc: CC, id: string): Promise<AidRequestDBProxy> {
    const testAidRequestInMemoryDatabaseRow =
      TestAidRequestInMemoryDatabase.get(id);
    if (testAidRequestInMemoryDatabaseRow == null) {
      throw new Error(`AidRequest with id ${id} not found`);
    }
    return new TestAidRequestDBProxy(cc, testAidRequestInMemoryDatabaseRow);
  }

  public async create(cc: CC, args: AidRequestCreateArgs): Promise<AidRequest> {
    const id = TestID.create('aid_request');
    const [
      history,
      sharingGroupID,
      whoIsWorkingOnItUserIDs,
      whoRecordedItUserID,
    ] = await Promise.all([
      this.createHistory(cc, args),
      args.sharingGroup.getID(),
      Promise.all(args.whoIsWorkingOnIt.map((user) => user.getID())),
      args.whoRecordedIt.getID(),
    ]);
    const properties: TestAidRequestInMemoryDatabaseRowProperties = {
      completed: args.completed,
      history,
      id,
      sharingGroupID,
      whatIsNeeded: args.whatIsNeeded,
      whoIsItFor: args.whoIsItFor,
      whoIsWorkingOnItUserIDs,
      whoRecordedItUserID,
    };
    const row = new TestAidRequestInMemoryDatabaseRow(properties);
    TestAidRequestInMemoryDatabase.set(id, row);
    const aidRequest = await AidRequest.load(cc, id);
    if (aidRequest == null) {
      throw new Error(
        'TestAidRequestDBGateway -- Failed to create or load aid request',
      );
    }
    return aidRequest;
  }

  private async createHistory(
    cc: CC,
    { history }: AidRequestCreateArgs,
  ): Promise<ReadonlyArray<AidRequestHistoryEventDBProxy>> {
    return history.map((actionWC) =>
      TestAidRequestHistoryEventDBProxyFactory.create(cc, actionWC),
    );
  }
}
