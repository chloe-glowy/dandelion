import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestActionWithContext } from 'src/server/entities/public/aid_request_action_with_context/AidRequestActionWithContext';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { TestAidRequestChangedWhatIsNeededHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/changed_what_is_needed/TestAidRequestChangedWhatIsNeededHistoryEventDBProxy';
import { TestAidRequestChangedWhoIsItForHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/changed_who_is_it_for/TestAidRequestChangedWhoIsItForHistoryEventDBProxy';
import { TestAidRequestCommentHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/comment/TestAidRequestCommentHistoryEventDBProxy';
import { TestAidRequestCreatedHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/created/TestAidRequestCreatedHistoryEventDBProxy';
import { TestAidRequestDeletedHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/deleted/TestAidRequestDeletedHistoryEventDBProxy';
import { TestAidRequestMarkedAsCompletedHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/marked_as_completed/TestAidRequestMarkedAsCompletedHistoryEventDBProxy';
import { TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/marked_as_not_completed/TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy';
import { TestAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/marked_as_not_working_on/TestAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy';
import { TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/marked_as_working_on/TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy';
import { TestAidRequestHistoryEventDBProxySharedProperties } from 'src/server/tests/application/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';
import { TestID } from 'src/server/tests/application/mocks/TestID';

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

    return action.handleSubtype<AidRequestHistoryEventDBProxy>({
      AidRequestChangedWhatIsNeededAction: (action) =>
        new TestAidRequestChangedWhatIsNeededHistoryEventDBProxy(
          cc,
          sharedProperties,
          { newValue: action.newValue, oldValue: action.oldValue },
        ),
      AidRequestChangedWhoIsItForAction: (action) =>
        new TestAidRequestChangedWhoIsItForHistoryEventDBProxy(
          cc,
          sharedProperties,
          { newValue: action.newValue, oldValue: action.oldValue },
        ),
      AidRequestCommentAction: (action) =>
        new TestAidRequestCommentHistoryEventDBProxy(cc, sharedProperties, {
          rawCommentContents: action.commentValue,
        }),
      AidRequestCreatedAction: (_action) =>
        new TestAidRequestCreatedHistoryEventDBProxy(cc, sharedProperties),
      AidRequestDeletedAction: (_action) =>
        new TestAidRequestDeletedHistoryEventDBProxy(cc, sharedProperties),
      AidRequestMarkedAsCompletedAction: (_action) =>
        new TestAidRequestMarkedAsCompletedHistoryEventDBProxy(
          cc,
          sharedProperties,
        ),
      AidRequestMarkedAsNotCompletedAction: (_action) =>
        new TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy(
          cc,
          sharedProperties,
        ),
      AidRequestMarkedAsNotWorkingOnAction: (_action) =>
        new TestAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy(
          cc,
          sharedProperties,
        ),
      AidRequestMarkedAsWorkingOnAction: (_action) =>
        new TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy(
          cc,
          sharedProperties,
        ),
    });
  }
}
