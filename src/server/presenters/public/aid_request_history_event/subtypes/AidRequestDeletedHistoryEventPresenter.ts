import { AidRequestDeletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/deleted/AidRequestDeletedHistoryEvent';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';

export class AidRequestDeletedHistoryEventPresenter extends AidRequestHistoryEventPresenter {
  constructor(protected event: AidRequestDeletedHistoryEvent) {
    super();
  }

  public async getMessage(): Promise<string> {
    return 'Deleted this';
  }

  protected async getShortSummaryVerb(): Promise<string> {
    return 'deleted this';
  }
}
