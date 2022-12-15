import { AidRequestMarkedAsNotCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedHistoryEvent';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';

export class AidRequestMarkedAsNotCompletedHistoryEventPresenter extends AidRequestHistoryEventPresenter {
  constructor(protected event: AidRequestMarkedAsNotCompletedHistoryEvent) {
    super();
  }

  public async getMessage(): Promise<string> {
    return 'Marked this as incomplete';
  }

  protected async getShortSummaryVerb(): Promise<string> {
    return 'un-completed this';
  }
}
