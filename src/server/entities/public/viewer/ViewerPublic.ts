import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import {
  LoggedOutViewerContext,
  UserViewerContext,
  VC,
} from 'src/server/entities/private/vc/ViewerContext';
import { AuthenticatedUserID } from 'src/server/entities/public/user/AuthenticatedUserID';
import { User } from 'src/server/entities/public/user/User';

export abstract class ViewerPublic {
  public static async initializeViewerContext(
    cc: CC,
    id: AuthenticatedUserID,
  ): Promise<void> {
    const user = await User.loadViewer(cc, id);
    const vc =
      user == null ? new LoggedOutViewerContext() : new UserViewerContext(user);

    cc.get(VC).setViewerContext(vc);
  }

  public static isLoggedIn(cc: CC): boolean {
    return cc.get(VC).vc.user != null;
  }

  public static assertLoggedIn(cc: CC, action: string): void {
    if (!ViewerPublic.isLoggedIn(cc)) {
      throw new Error('You must be logged in for action: ' + action);
    }
  }

  public static async hasAccessToMultipleSharingGroups(
    cc: CC,
  ): Promise<boolean> {
    const user = Viewer.getUser(cc);
    const isSystem = Viewer.getIsSystem(cc);
    if (isSystem) {
      return true;
    }
    if (user == null) {
      return false;
    }
    return await user.getIsInMultipleSharingGroups();
  }
}
