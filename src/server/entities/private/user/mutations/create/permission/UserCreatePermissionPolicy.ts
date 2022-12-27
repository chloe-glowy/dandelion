import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { UserCreateArgs } from 'src/server/entities/public/user/mutations/UserCreate';

export class UserCreatePermissionPolicy {
  public static async isAllowed(
    cc: CC,
    _args: UserCreateArgs,
  ): Promise<boolean> {
    const user = Viewer.getUser(cc);
    const isSystem = Viewer.getIsSystem(cc);
    if (isSystem) {
      return false;
    }
    if (user != null) {
      return false;
    }
    // Anyone who is logged out can create a user
    return true;
  }
}
