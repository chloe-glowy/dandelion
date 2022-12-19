import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { AidRequestChangedWhatIsNeededHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededHistoryEvent';
import { AidRequestChangedWhoIsItForHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForHistoryEvent';
import { AidRequestCommentHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/comment/AidRequestCommentHistoryEvent';
import { AidRequestCreatedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEvent';
import { AidRequestDeletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/deleted/AidRequestDeletedHistoryEvent';
import { AidRequestMarkedAsCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_completed/AidRequestMarkedAsCompletedHistoryEvent';
import { AidRequestMarkedAsNotCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedHistoryEvent';
import { AidRequestMarkedAsNotWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnHistoryEvent';
import { AidRequestMarkedAsWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEvent';
import { TestAidRequestChangedWhatIsNeededHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/changed_what_is_needed/TestAidRequestChangedWhatIsNeededHistoryEventDBProxy';
import { TestAidRequestChangedWhoIsItForHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/changed_who_is_it_for/TestAidRequestChangedWhoIsItForHistoryEventDBProxy';
import { TestAidRequestCommentHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/comment/TestAidRequestCommentHistoryEventDBProxy';
import { TestAidRequestCreatedHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/created/TestAidRequestCreatedHistoryEventDBProxy';
import { TestAidRequestDeletedHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/deleted/TestAidRequestDeletedHistoryEventDBProxy';
import { TestAidRequestMarkedAsCompletedHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/marked_as_completed/TestAidRequestMarkedAsCompletedHistoryEventDBProxy';
import { TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/marked_as_not_completed/TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy';
import { TestAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/marked_as_not_working_on/TestAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy';
import { TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/marked_as_working_on/TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy';

export abstract class TestAidRequestHistoryEventFactory {
  public static create(
    cc: CC,
    historyEventDBProxy: AidRequestHistoryEventDBProxy,
  ): AidRequestHistoryEvent {
    if (
      historyEventDBProxy instanceof
      TestAidRequestChangedWhatIsNeededHistoryEventDBProxy
    ) {
      return new AidRequestChangedWhatIsNeededHistoryEvent(
        cc,
        historyEventDBProxy,
      );
    } else if (
      historyEventDBProxy instanceof
      TestAidRequestChangedWhoIsItForHistoryEventDBProxy
    ) {
      return new AidRequestChangedWhoIsItForHistoryEvent(
        cc,
        historyEventDBProxy,
      );
    } else if (
      historyEventDBProxy instanceof TestAidRequestCommentHistoryEventDBProxy
    ) {
      return new AidRequestCommentHistoryEvent(cc, historyEventDBProxy);
    } else if (
      historyEventDBProxy instanceof TestAidRequestCreatedHistoryEventDBProxy
    ) {
      return new AidRequestCreatedHistoryEvent(cc, historyEventDBProxy);
    } else if (
      historyEventDBProxy instanceof TestAidRequestDeletedHistoryEventDBProxy
    ) {
      return new AidRequestDeletedHistoryEvent(cc, historyEventDBProxy);
    } else if (
      historyEventDBProxy instanceof
      TestAidRequestMarkedAsCompletedHistoryEventDBProxy
    ) {
      return new AidRequestMarkedAsCompletedHistoryEvent(
        cc,
        historyEventDBProxy,
      );
    } else if (
      historyEventDBProxy instanceof
      TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy
    ) {
      return new AidRequestMarkedAsNotCompletedHistoryEvent(
        cc,
        historyEventDBProxy,
      );
    } else if (
      historyEventDBProxy instanceof
      TestAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy
    ) {
      return new AidRequestMarkedAsNotWorkingOnHistoryEvent(
        cc,
        historyEventDBProxy,
      );
    } else if (
      historyEventDBProxy instanceof
      TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy
    ) {
      return new AidRequestMarkedAsWorkingOnHistoryEvent(
        cc,
        historyEventDBProxy,
      );
    } else {
      throw new Error(
        'TestAidRequestHistoryEventFactory -- Unknown AidRequestHistoryEventDBProxy type: ' +
          historyEventDBProxy.constructor.name,
      );
    }
  }
}
