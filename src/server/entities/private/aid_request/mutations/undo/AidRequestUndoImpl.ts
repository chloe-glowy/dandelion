import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import { AidRequestUndoPermissionPolicy } from 'src/server/entities/private/aid_request/mutations/undo/permission/AidRequestUndoPermissionPolicy';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { User } from 'src/server/entities/public/user/User';

export class AidRequestUndoImpl {
  public static async exec(
    cc: CC,
    aidRequest: AidRequest,
    historyEventID: string,
    impl: (actor: User) => Promise<void>,
  ): Promise<void> {
    const actor = Viewer.getUser(cc);
    if (actor == null) {
      throw new Error('User must be logged in to edit aid requests');
    }
    const hasPermission = await AidRequestUndoPermissionPolicy.isAllowed(
      cc,
      aidRequest,
      historyEventID,
    );
    if (!hasPermission) {
      throw new Error('You do not have permission to undo this action');
    }
    return await impl(actor);
  }
}
