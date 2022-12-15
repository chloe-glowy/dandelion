import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import {
  EditAidRequestInteractorArgs,
  EditAidRequestInteractorResult,
} from 'src/server/interactors/edit_aid_requests/types/EditAidRequestInteractorTypes';

export abstract class EditAidRequestInteractor {
  public static async execute(
    cc: CC,
    args: EditAidRequestInteractorArgs,
  ): Promise<EditAidRequestInteractorResult> {
    const user = Viewer.getUser(cc);
    if (user == null) {
      throw new Error('User must be logged in to Edit aid requests');
    }

    const aidRequest = await AidRequest.load(cc, args.aidRequestID);
    if (aidRequest == null) {
      throw new Error('Aid request not found');
    }

    const response = await aidRequest.edit(cc, args.action);

    return {
      ...response,
      aidRequest,
    };
  }
}
