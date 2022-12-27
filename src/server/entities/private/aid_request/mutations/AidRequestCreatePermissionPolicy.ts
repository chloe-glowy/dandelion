import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { AidRequestCreateArgs } from 'src/server/entities/public/aid_request/mutations/AidRequestCreate';

export class AidRequestCreatePermissionPolicy {
  public static async isAllowed(
    cc: CC,
    args: AidRequestCreateArgs,
  ): Promise<boolean> {
    const user = Viewer.getUser(cc);
    const isSystem = Viewer.getIsSystem(cc);
    if (isSystem) {
      return true;
    }
    if (user == null) {
      return false;
    }
    return await user.getIsMemberOfSharingGroup(args.sharingGroup);
  }
}
