import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';
import { AidRequestHistoryEventFieldNameChangePresenter } from 'src/server/presenters/private/AidRequestHistoryEventFieldNameChangePresenter';
import { EditAidRequestSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/EditAidRequestSummarizer';

export class EditAidRequestChangedWhatIsNeededSummarizer
  implements EditAidRequestSummarizer
{
  public constructor(
    private readonly cc: CC,
    private readonly action: AidRequestChangedWhatIsNeededAction,
  ) {}

  public async getSummary(): Promise<string> {
    return AidRequestHistoryEventFieldNameChangePresenter.get(
      'request title',
      this.action.oldValue,
      this.action.newValue,
    );
  }
}
