import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { AidRequestChangedWhatIsNeededHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededHistoryEvent';
import { AidRequestChangedWhoIsItForHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForHistoryEvent';
import { AidRequestMarkedAsCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_completed/AidRequestMarkedAsCompletedHistoryEvent';
import { AidRequestMarkedAsNotCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedHistoryEvent';
import { AidRequestMarkedAsNotWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnHistoryEvent';
import { AidRequestMarkedAsWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEvent';
import { TestAidRequestChangedWhatIsNeededHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/subtypes/changed_what_is_needed/TestAidRequestChangedWhatIsNeededHistoryEventDBProxy';

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
      historyEventDBProxy instanceof
      TestAidRequestChangedWhoIsWorkingOnItHistoryEventDBProxy
    ) {
      return new AidRequestChangedWhoIsWorkingOnItHistoryEvent(
        cc,
        historyEventDBProxy,
      );
    } else if (
      historyEventDBProxy instanceof TestAidRequestCommentActHistoryEventDBProxy
    ) {
      return new AidRequestCommentActHistoryEvent(cc, historyEventDBProxy);
    } else if (
      historyEventDBProxy instanceof TestAidRequestCreatedActHistoryEventDBProxy
    ) {
      return new AidRequestCreatedActHistoryEvent(cc, historyEventDBProxy);
    } else if (
      historyEventDBProxy instanceof TestAidRequestDeletedActHistoryEventDBProxy
    ) {
      return new AidRequestDeletedActHistoryEvent(cc, historyEventDBProxy);
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
