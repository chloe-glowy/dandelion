import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestChangedWhatIsNeededHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededHistoryEvent';
import { AidRequestChangedWhoIsItForHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForHistoryEvent';
import { AidRequestCommentHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/comment/AidRequestCommentHistoryEvent';
import { AidRequestCreatedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEvent';
import { AidRequestDeletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/deleted/AidRequestDeletedHistoryEvent';
import { AidRequestMarkedAsCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_completed/AidRequestMarkedAsCompletedHistoryEvent';
import { AidRequestMarkedAsNotCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedHistoryEvent';
import { AidRequestMarkedAsNotWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnHistoryEvent';
import { AidRequestMarkedAsWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEvent';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';
import { AidRequestChangedWhatIsNeededHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/subtypes/AidRequestChangedWhatIsNeededHistoryEventPresenter';
import { AidRequestChangedWhoIsItForHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/subtypes/AidRequestChangedWhoIsItForHistoryEventPresenter';
import { AidRequestCommentHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/subtypes/AidRequestCommentHistoryEventPresenter';
import { AidRequestCreatedHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/subtypes/AidRequestCreatedHistoryEventPresenter';
import { AidRequestDeletedHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/subtypes/AidRequestDeletedHistoryEventPresenter';
import { AidRequestMarkedAsCompletedHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/subtypes/AidRequestMarkedAsCompletedHistoryEventPresenter';
import { AidRequestMarkedAsNotCompletedHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/subtypes/AidRequestMarkedAsNotCompletedHistoryEventPresenter';
import { AidRequestMarkedAsNotWorkingOnHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/subtypes/AidRequestMarkedAsNotWorkingOnHistoryEventPresenter';
import { AidRequestMarkedAsWorkingOnHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/subtypes/AidRequestMarkedAsWorkingOnHistoryEventPresenter';

export abstract class AidRequestHistoryEventPresenterFactory {
  public static create(
    historyEvent: AidRequestHistoryEvent,
  ): AidRequestHistoryEventPresenter {
    if (historyEvent instanceof AidRequestCreatedHistoryEvent) {
      return new AidRequestCreatedHistoryEventPresenter(historyEvent);
    } else if (
      historyEvent instanceof AidRequestChangedWhatIsNeededHistoryEvent
    ) {
      return new AidRequestChangedWhatIsNeededHistoryEventPresenter(
        historyEvent,
      );
    } else if (
      historyEvent instanceof AidRequestChangedWhoIsItForHistoryEvent
    ) {
      return new AidRequestChangedWhoIsItForHistoryEventPresenter(historyEvent);
    } else if (historyEvent instanceof AidRequestCommentHistoryEvent) {
      return new AidRequestCommentHistoryEventPresenter(historyEvent);
    } else if (
      historyEvent instanceof AidRequestMarkedAsCompletedHistoryEvent
    ) {
      return new AidRequestMarkedAsCompletedHistoryEventPresenter(historyEvent);
    } else if (
      historyEvent instanceof AidRequestMarkedAsNotCompletedHistoryEvent
    ) {
      return new AidRequestMarkedAsNotCompletedHistoryEventPresenter(
        historyEvent,
      );
    } else if (historyEvent instanceof AidRequestDeletedHistoryEvent) {
      return new AidRequestDeletedHistoryEventPresenter(historyEvent);
    } else if (
      historyEvent instanceof AidRequestMarkedAsWorkingOnHistoryEvent
    ) {
      return new AidRequestMarkedAsWorkingOnHistoryEventPresenter(historyEvent);
    } else if (
      historyEvent instanceof AidRequestMarkedAsNotWorkingOnHistoryEvent
    ) {
      return new AidRequestMarkedAsNotWorkingOnHistoryEventPresenter(
        historyEvent,
      );
    }
    throw new Error('not yet implemented');
  }
}
