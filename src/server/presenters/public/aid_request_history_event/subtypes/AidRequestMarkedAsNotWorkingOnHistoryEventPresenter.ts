import { AidRequestMarkedAsNotWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnHistoryEvent';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';

export class AidRequestMarkedAsNotWorkingOnHistoryEventPresenter extends AidRequestHistoryEventPresenter {
  constructor(protected event: AidRequestMarkedAsNotWorkingOnHistoryEvent) {
    super();
  }

  public async getMessage(): Promise<string> {
    return 'Stopped working on this';
  }

  protected async getShortSummaryVerb(): Promise<string> {
    return 'stopped working on it';
  }
}
