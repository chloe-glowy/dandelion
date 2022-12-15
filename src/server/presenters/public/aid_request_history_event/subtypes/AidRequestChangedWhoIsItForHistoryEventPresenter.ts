import { AidRequestChangedWhoIsItForHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForHistoryEvent';
import { AidRequestHistoryEventFieldNameChangePresenter } from 'src/server/presenters/private/AidRequestHistoryEventFieldNameChangePresenter';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';

export class AidRequestChangedWhoIsItForHistoryEventPresenter extends AidRequestHistoryEventPresenter {
  constructor(protected event: AidRequestChangedWhoIsItForHistoryEvent) {
    super();
  }

  public async getMessage(): Promise<string> {
    const [oldValue, newValue] = await Promise.all([
      this.event.getOldValue(),
      this.event.getNewValue(),
    ]);
    return AidRequestHistoryEventFieldNameChangePresenter.get(
      'recipient name',
      oldValue,
      newValue,
    );
  }

  protected async getShortSummaryVerb(): Promise<string> {
    return 'edited';
  }
}
