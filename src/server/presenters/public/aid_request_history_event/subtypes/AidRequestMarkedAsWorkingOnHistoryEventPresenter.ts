import { AidRequestMarkedAsWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEvent';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';

export class AidRequestMarkedAsWorkingOnHistoryEventPresenter extends AidRequestHistoryEventPresenter {
  constructor(protected event: AidRequestMarkedAsWorkingOnHistoryEvent) {
    super();
  }

  public async getMessage(): Promise<string> {
    return 'Started working on this';
  }

  protected async getShortSummaryVerb(): Promise<string> {
    return 'started working on it';
  }
}
