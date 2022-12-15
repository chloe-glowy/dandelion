import { CC } from 'src/server/context_container/public/ContextContainer';
import {
  UndoAidRequestEditControllerArgs,
  UndoAidRequestEditControllerResult,
} from 'src/server/controllers/undo_aid_request_edit/types/UndoAidRequestEditControllerTypes';
import { UndoAidRequestEditInteractor } from 'src/server/interactors/undo_aid_request_edit/UndoAidRequestEditInteractor';
import { AidRequestPresenter } from 'src/server/presenters/public/aid_request/AidRequestPresenter';

export abstract class UndoAidRequestEditController {
  public static async execute(
    cc: CC,
    args: UndoAidRequestEditControllerArgs,
  ): Promise<UndoAidRequestEditControllerResult> {
    const { aidRequest } = await UndoAidRequestEditInteractor.execute(cc, args);
    return {
      aidRequest: new AidRequestPresenter(cc, aidRequest),
    };
  }
}
