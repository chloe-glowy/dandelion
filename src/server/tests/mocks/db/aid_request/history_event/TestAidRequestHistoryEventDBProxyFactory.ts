import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';
import { AidRequestChangedWhoIsItForAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForAction';
import { AidRequestCommentAction } from 'src/server/entities/public/aid_request_action/subtypes/comment/AidRequestCommentAction';
import { AidRequestCreatedAction } from 'src/server/entities/public/aid_request_action/subtypes/created/AidRequestCreatedAction';
import { AidRequestDeletedAction } from 'src/server/entities/public/aid_request_action/subtypes/deleted/AidRequestDeletedAction';
import { AidRequestMarkedAsCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_completed/AidRequestMarkedAsCompletedAction';
import { AidRequestMarkedAsNotCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedAction';
import { AidRequestMarkedAsNotWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnAction';
import { AidRequestMarkedAsWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnAction';
import { AidRequestActionWithContext } from 'src/server/entities/public/aid_request_action_with_context/AidRequestActionWithContext';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { TestAidRequestChangedWhatIsNeededHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/subtypes/changed_what_is_needed/TestAidRequestChangedWhatIsNeededHistoryEventDBProxy';
import { TestAidRequestChangedWhoIsItForHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/subtypes/changed_who_is_it_for/TestAidRequestChangedWhoIsItForHistoryEventDBProxy';
import { TestAidRequestCommentHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/subtypes/comment/TestAidRequestCommentHistoryEventDBProxy';
import { TestAidRequestCreatedHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/subtypes/created/TestAidRequestCreatedHistoryEventDBProxy';
import { TestAidRequestDeletedHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/subtypes/deleted/TestAidRequestDeletedHistoryEventDBProxy';
import { TestAidRequestMarkedAsCompletedHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/subtypes/marked_as_completed/TestAidRequestMarkedAsCompletedHistoryEventDBProxy';
import { TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/subtypes/marked_as_not_completed/TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy';
import { TestAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/subtypes/marked_as_not_working_on/TestAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy';
import { TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/subtypes/marked_as_working_on/TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy';
import { TestAidRequestHistoryEventDBProxySharedProperties } from 'src/server/tests/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';
import { TestID } from 'src/server/tests/mocks/TestID';

export abstract class TestAidRequestHistoryEventDBProxyFactory {
  public static create(
    cc: CC,
    { action, actorID, timestamp }: AidRequestActionWithContext,
  ): AidRequestHistoryEventDBProxy {
    const id = TestID.create('aid_request_history_event');
    const sharedProperties: TestAidRequestHistoryEventDBProxySharedProperties =
      {
        actorID,
        id,
        timestamp,
      };

    if (action instanceof AidRequestChangedWhatIsNeededAction) {
      return new TestAidRequestChangedWhatIsNeededHistoryEventDBProxy(
        cc,
        sharedProperties,
        { newValue: action.newValue, oldValue: action.oldValue },
      );
    } else if (action instanceof AidRequestChangedWhoIsItForAction) {
      return new TestAidRequestChangedWhoIsItForHistoryEventDBProxy(
        cc,
        sharedProperties,
        { newValue: action.newValue, oldValue: action.oldValue },
      );
    } else if (action instanceof AidRequestCommentAction) {
      return new TestAidRequestCommentHistoryEventDBProxy(
        cc,
        sharedProperties,
        { rawCommentContents: action.commentValue },
      );
    } else if (action instanceof AidRequestCreatedAction) {
      return new TestAidRequestCreatedHistoryEventDBProxy(cc, sharedProperties);
    } else if (action instanceof AidRequestDeletedAction) {
      return new TestAidRequestDeletedHistoryEventDBProxy(cc, sharedProperties);
    } else if (action instanceof AidRequestMarkedAsCompletedAction) {
      return new TestAidRequestMarkedAsCompletedHistoryEventDBProxy(
        cc,
        sharedProperties,
      );
    } else if (action instanceof AidRequestMarkedAsNotCompletedAction) {
      return new TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy(
        cc,
        sharedProperties,
      );
    } else if (action instanceof AidRequestMarkedAsNotWorkingOnAction) {
      return new TestAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy(
        cc,
        sharedProperties,
      );
    } else if (action instanceof AidRequestMarkedAsWorkingOnAction) {
      return new TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy(
        cc,
        sharedProperties,
      );
    } else {
      throw new Error(
        'TestAidRequestDBGateway -- Unknown action type: ' +
          action.constructor.name,
      );
    }
  }
}
