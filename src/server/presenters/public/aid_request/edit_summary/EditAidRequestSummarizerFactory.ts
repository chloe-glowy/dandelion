import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';
import { AidRequestChangedWhoIsItForAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForAction';
import { AidRequestCommentAction } from 'src/server/entities/public/aid_request_action/subtypes/comment/AidRequestCommentAction';
import { EditAidRequestSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/EditAidRequestSummarizer';
import { EditAidRequestChangedWhatIsNeededSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/subtypes/EditAidRequestChangedWhatIsNeededSummarizer';
import { EditAidRequestChangedWhoIsItForSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/subtypes/EditAidRequestChangedWhoIsItForSummarizer';
import { EditAidRequestCommentSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/subtypes/EditAidRequestCommentSummarizer';

export abstract class EditAidRequestSummarizerFactory {
  public static async create(
    cc: CC,
    action: AidRequestAction,
  ): Promise<EditAidRequestSummarizer> {
    if (action instanceof AidRequestChangedWhatIsNeededAction) {
      return new EditAidRequestChangedWhatIsNeededSummarizer(cc, action);
    }
    if (action instanceof AidRequestChangedWhoIsItForAction) {
      return new EditAidRequestChangedWhoIsItForSummarizer(cc, action);
    }
    if (action instanceof AidRequestCommentAction) {
      return new EditAidRequestCommentSummarizer(cc, action);
    }
    throw new Error(
      'EditAidRequestSummarizerFactory -- Unhandled action type -- ' +
        action.constructor.name,
    );
  }
}
