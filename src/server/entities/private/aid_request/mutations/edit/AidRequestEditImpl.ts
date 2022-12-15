import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import { AidRequestEditPermissionPolicy } from 'src/server/entities/private/aid_request/mutations/edit/permission/AidRequestEditPermissionPolicy';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestEditResponse } from 'src/server/entities/public/aid_request/mutations/AidRequestEdit';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { User } from 'src/server/entities/public/user/User';

export class AidRequestEditImpl {
  public static async exec(
    cc: CC,
    aidRequest: AidRequest,
    action: AidRequestAction,
    impl: (actor: User) => Promise<AidRequestEditResponse>,
  ): Promise<AidRequestEditResponse> {
    const actor = Viewer.getUser(cc);
    if (actor == null) {
      throw new Error('User must be logged in to edit aid requests');
    }
    const hasPermission = await AidRequestEditPermissionPolicy.isAllowed(
      cc,
      aidRequest,
      action,
    );
    if (!hasPermission) {
      throw new Error('You do not have permission to edit this aid request');
    }
    return await impl(actor);
  }
}
