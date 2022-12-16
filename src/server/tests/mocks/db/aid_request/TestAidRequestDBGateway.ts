import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestCreateArgs } from 'src/server/entities/public/aid_request/mutations/AidRequestCreate';
import { AidRequestDBGatewayType } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBGatewayType';
import { AidRequestDBProxy } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBProxy';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';
import { AidRequestChangedWhoIsItForAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForAction';
import { AidRequestCommentAction } from 'src/server/entities/public/aid_request_action/subtypes/comment/AidRequestCommentAction';
import { AidRequestCreatedAction } from 'src/server/entities/public/aid_request_action/subtypes/created/AidRequestCreatedAction';
import { AidRequestDeletedAction } from 'src/server/entities/public/aid_request_action/subtypes/deleted/AidRequestDeletedAction';
import { AidRequestMarkedAsCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_completed/AidRequestMarkedAsCompletedAction';
import { AidRequestMarkedAsNotCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedAction';
import { AidRequestMarkedAsNotWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnAction';
import { AidRequestMarkedAsWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnAction';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { TestAidRequestDBProxy } from 'src/server/tests/mocks/db/aid_request/TestAidRequestDBProxy';
import { TestAidRequestInMemoryDatabase } from 'src/server/tests/mocks/db/aid_request/TestAidRequestInMemoryDatabase';
import {
  TestAidRequestInMemoryDatabaseRow,
  TestAidRequestInMemoryDatabaseRowProperties,
} from 'src/server/tests/mocks/db/aid_request/TestAidRequestInMemoryDatabaseRow';
import { TestID } from 'src/server/tests/mocks/TestID';

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
    { createdAt, whoRecordedIt, history }: AidRequestCreateArgs,
  ): Promise<ReadonlyArray<AidRequestHistoryEventDBProxy>> {
    return history.map(
      (action: AidRequestAction): AidRequestHistoryEventDBProxy => {
        if (action instanceof AidRequestChangedWhatIsNeededAction) {
          return new TestAidRequestChangedWhatIsNeededHistoryEventDBProxy();
        } else if (action instanceof AidRequestChangedWhoIsItForAction) {
          return new TestAidRequestChangedWhoIsItForHistoryEventDBProxy();
        } else if (action instanceof AidRequestChangedWhoIsWorkingOnItAction) {
          return new TestAidRequestChangedWhoIsWorkingOnItHistoryEventDBProxy();
        } else if (action instanceof AidRequestCommentAction) {
          return new TestAidRequestCommentHistoryEventDBProxy();
        } else if (action instanceof AidRequestCreatedAction) {
          return new TestAidRequestCreatedHistoryEventDBProxy();
        } else if (action instanceof AidRequestDeletedAction) {
          return new TestAidRequestDeletedHistoryEventDBProxy();
        } else if (action instanceof AidRequestMarkedAsCompletedAction) {
          return new TestAidRequestMarkedAsCompletedHistoryEventDBProxy();
        } else if (action instanceof AidRequestMarkedAsNotCompletedAction) {
          return new TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy();
        } else if (action instanceof AidRequestMarkedAsNotWorkingOnAction) {
          return new TestAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy();
        } else if (action instanceof AidRequestMarkedAsWorkingOnAction) {
          return new TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy();
        } else {
          throw new Error(
            'TestAidRequestDBGateway -- Unknown action type: ' +
              action.constructor.name,
          );
        }
      },
    );
  }
}
