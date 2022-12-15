import { AidRequestCreatedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEvent';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';

export class AidRequestCreatedHistoryEventPresenter extends AidRequestHistoryEventPresenter {
  constructor(protected event: AidRequestCreatedHistoryEvent) {
    super();
  }

  public async getMessage(): Promise<string> {
    return 'Recorded this';
  }

  protected async getShortSummaryVerb(): Promise<string> {
    return 'recorded this';
  }
}
