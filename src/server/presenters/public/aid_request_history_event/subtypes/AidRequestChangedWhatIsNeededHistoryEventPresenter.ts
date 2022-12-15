import { AidRequestChangedWhatIsNeededHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededHistoryEvent';
import { AidRequestHistoryEventFieldNameChangePresenter } from 'src/server/presenters/private/AidRequestHistoryEventFieldNameChangePresenter';
import { AidRequestHistoryEventPresenter } from 'src/server/presenters/public/aid_request_history_event/AidRequestHistoryEventPresenter';

export class AidRequestChangedWhatIsNeededHistoryEventPresenter extends AidRequestHistoryEventPresenter {
  constructor(protected event: AidRequestChangedWhatIsNeededHistoryEvent) {
    super();
  }

  public async getMessage(): Promise<string> {
    const [oldValue, newValue] = await Promise.all([
      this.event.getOldValue(),
      this.event.getNewValue(),
    ]);
    return AidRequestHistoryEventFieldNameChangePresenter.get(
      'request title',
      oldValue,
      newValue,
    );
  }

  protected async getShortSummaryVerb(): Promise<string> {
    return 'edited';
  }
}
