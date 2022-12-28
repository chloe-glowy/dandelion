import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
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
    return historyEvent.handleSubtype<AidRequestHistoryEventPresenter>({
      AidRequestChangedWhatIsNeededHistoryEvent: (historyEvent) =>
        new AidRequestChangedWhatIsNeededHistoryEventPresenter(historyEvent),
      AidRequestChangedWhoIsItForHistoryEvent: (historyEvent) =>
        new AidRequestChangedWhoIsItForHistoryEventPresenter(historyEvent),
      AidRequestCommentHistoryEvent: (historyEvent) =>
        new AidRequestCommentHistoryEventPresenter(historyEvent),
      AidRequestCreatedHistoryEvent: (historyEvent) =>
        new AidRequestCreatedHistoryEventPresenter(historyEvent),
      AidRequestDeletedHistoryEvent: (historyEvent) =>
        new AidRequestDeletedHistoryEventPresenter(historyEvent),
      AidRequestMarkedAsCompletedHistoryEvent: (historyEvent) =>
        new AidRequestMarkedAsCompletedHistoryEventPresenter(historyEvent),
      AidRequestMarkedAsNotCompletedHistoryEvent: (historyEvent) =>
        new AidRequestMarkedAsNotCompletedHistoryEventPresenter(historyEvent),
      AidRequestMarkedAsNotWorkingOnHistoryEvent: (historyEvent) =>
        new AidRequestMarkedAsNotWorkingOnHistoryEventPresenter(historyEvent),
      AidRequestMarkedAsWorkingOnHistoryEvent: (historyEvent) =>
        new AidRequestMarkedAsWorkingOnHistoryEventPresenter(historyEvent),
    });
  }
}
