import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestPrivacyPolicy } from 'src/server/entities/public/aid_request/policy/AidRequestPrivacyPolicy';

export class AidRequestUndoPermissionPolicy {
  public static async isAllowed(
    cc: CC,
    aidRequest: AidRequest,
    historyEventID: string,
  ): Promise<boolean> {
    const user = Viewer.getUser(cc);
    const isSystem = Viewer.getIsSystem(cc);
    if (isSystem) {
      return true;
    }
    if (user == null) {
      return false;
    }
    const canSeeAidRequest = await AidRequestPrivacyPolicy.canSee(
      cc,
      aidRequest,
    );
    if (!canSeeAidRequest) {
      return false;
    }
    const historyEvent = await aidRequest.getHistoryEvent(historyEventID);
    const actor = await historyEvent.getActor();
    if (actor == null) {
      return false;
    }
    const isUser = await user.isSameUser(actor);
    if (!isUser) {
      return false;
    }
    return await historyEvent.supportsUndo();
  }
}
