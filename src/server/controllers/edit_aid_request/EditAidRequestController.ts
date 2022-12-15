import { CC } from 'src/server/context_container/public/ContextContainer';
import {
  EditAidRequestControllerArgs,
  EditAidRequestControllerResult,
} from 'src/server/controllers/edit_aid_request/types/EditAidRequestControllerTypes';
import { EditAidRequestInteractor } from 'src/server/interactors/edit_aid_requests/EditAidRequestsInteractor';
import { AidRequestPresenter } from 'src/server/presenters/public/aid_request/AidRequestPresenter';
import { EditAidRequestSummarizerFactory } from 'src/server/presenters/public/aid_request/edit_summary/EditAidRequestSummarizerFactory';

export abstract class EditAidRequestController {
  public static async execute(
    cc: CC,
    args: EditAidRequestControllerArgs,
  ): Promise<EditAidRequestControllerResult> {
    const [result, postpublishSummary] = await Promise.all([
      EditAidRequestInteractor.execute(cc, args),
      EditAidRequestController.getPostpublishSummary(cc, args),
    ]);
    const aidRequest = new AidRequestPresenter(cc, result.aidRequest);
    return {
      aidRequest,
      historyEventIDForUndo: result.historyEventIDForUndo,
      postpublishSummary,
    };
  }

  /**
   * TODO -- Should this be in a presenter?
   */
  private static async getPostpublishSummary(
    cc: CC,
    args: EditAidRequestControllerArgs,
  ): Promise<string> {
    const summarizer = await EditAidRequestSummarizerFactory.create(
      cc,
      args.action,
    );
    return await summarizer.getSummary();
  }
}
