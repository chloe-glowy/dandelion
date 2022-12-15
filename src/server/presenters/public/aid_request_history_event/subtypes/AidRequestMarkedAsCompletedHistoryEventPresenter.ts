import { AidRequestMarkedAsCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_completed/AidRequestMarkedAsCompletedHistoryEvent';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';

export class AidRequestMarkedAsCompletedHistoryEventPresenter extends AidRequestHistoryEventPresenter {
  constructor(protected event: AidRequestMarkedAsCompletedHistoryEvent) {
    super();
  }

  public async getMessage(): Promise<string> {
    return 'Marked this as complete';
  }

  protected async getShortSummaryVerb(): Promise<string> {
    return 'completed this';
  }
}
