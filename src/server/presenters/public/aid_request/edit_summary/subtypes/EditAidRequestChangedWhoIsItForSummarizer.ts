import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestChangedWhoIsItForAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForAction';
import { AidRequestHistoryEventFieldNameChangePresenter } from 'src/server/presenters/private/AidRequestHistoryEventFieldNameChangePresenter';
import { EditAidRequestSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/EditAidRequestSummarizer';

export class EditAidRequestChangedWhoIsItForSummarizer
  implements EditAidRequestSummarizer
{
  public constructor(
    private readonly cc: CC,
    private readonly action: AidRequestChangedWhoIsItForAction,
  ) {}

  public async getSummary(): Promise<string> {
    return AidRequestHistoryEventFieldNameChangePresenter.get(
      'recipient name',
      this.action.oldValue,
      this.action.newValue,
    );
  }
}
