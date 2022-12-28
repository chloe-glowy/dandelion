import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { EditAidRequestSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/EditAidRequestSummarizer';
import { EditAidRequestChangedWhatIsNeededSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/subtypes/EditAidRequestChangedWhatIsNeededSummarizer';
import { EditAidRequestChangedWhoIsItForSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/subtypes/EditAidRequestChangedWhoIsItForSummarizer';
import { EditAidRequestCommentSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/subtypes/EditAidRequestCommentSummarizer';

export abstract class EditAidRequestSummarizerFactory {
  public static async create(
    cc: CC,
    action: AidRequestAction,
  ): Promise<EditAidRequestSummarizer> {
    return action.handleSubtype<EditAidRequestSummarizer>({
      AidRequestChangedWhatIsNeededAction: (action) =>
        new EditAidRequestChangedWhatIsNeededSummarizer(cc, action),
      AidRequestChangedWhoIsItForAction: (action) =>
        new EditAidRequestChangedWhoIsItForSummarizer(cc, action),
      AidRequestCommentAction: (action) =>
        new EditAidRequestCommentSummarizer(cc, action),
      AidRequestCreatedAction: () => {
        throw new Error(
          'EditAidRequestSummarizerFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestDeletedAction: () => {
        throw new Error(
          'EditAidRequestSummarizerFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsCompletedAction: () => {
        throw new Error(
          'EditAidRequestSummarizerFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsNotCompletedAction: () => {
        throw new Error(
          'EditAidRequestSummarizerFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsNotWorkingOnAction: () => {
        throw new Error(
          'EditAidRequestSummarizerFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsWorkingOnAction: () => {
        throw new Error(
          'EditAidRequestSummarizerFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
    });
  }
}
