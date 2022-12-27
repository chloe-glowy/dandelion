import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { SharingGroupCreateArgs } from 'src/server/entities/public/sharing_group/mutations/SharingGroupCreate';

export class SharingGroupCreatePermissionPolicy {
  public static async isAllowed(
    cc: CC,
    _args: SharingGroupCreateArgs,
  ): Promise<boolean> {
    const user = Viewer.getUser(cc);
    const isSystem = Viewer.getIsSystem(cc);
    if (isSystem) {
      // The system can't create a sharing group, because
      // we need to have at least one user in the sharing group,
      // and currently on create we use the logged in user
      // as the initial user.
      return false;
    }
    if (user == null) {
      return false;
    }
    // As of now, anyone can create a sharing group
    return true;
  }
}
