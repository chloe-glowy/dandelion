import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import {
  UndoAidRequestEditInteractorArgs,
  UndoAidRequestEditInteractorResult,
} from 'src/server/interactors/undo_aid_request_edit/types/UndoAidRequestEditInteractorTypes';

export abstract class UndoAidRequestEditInteractor {
  public static async execute(
    cc: CC,
    args: UndoAidRequestEditInteractorArgs,
  ): Promise<UndoAidRequestEditInteractorResult> {
    const user = Viewer.getUser(cc);
    if (user == null) {
      throw new Error('User must be logged in to Edit aid requests');
    }

    const aidRequest = await AidRequest.load(cc, args.aidRequestID);
    if (aidRequest == null) {
      throw new Error('Aid request not found');
    }

    await aidRequest.undo(cc, args.historyEventID);

    return {
      aidRequest,
    };
  }
}
