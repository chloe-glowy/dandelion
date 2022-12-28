import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { AidRequestEditPermissionPolicyForActionFactory } from 'src/server/entities/private/aid_request/mutations/edit/permission/AidRequestEditPermissionPolicyForActionFactory';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestPrivacyPolicy } from 'src/server/entities/public/aid_request/policy/AidRequestPrivacyPolicy';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export class AidRequestEditPermissionPolicy {
  public static async isAllowed(
    cc: CC,
    aidRequest: AidRequest,
    action: AidRequestAction,
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
    const policyForEventType =
      AidRequestEditPermissionPolicyForActionFactory.create(
        cc,
        user,
        aidRequest,
        action,
      );
    return await policyForEventType.canEditAidRequest();
  }
}
