import { CC } from 'src/server/context_container/public/ContextContainer';
import { VC } from 'src/server/entities/private/vc/ViewerContext';
import { User } from 'src/server/entities/public/user/User';

export const UserPrivacyPolicy = {
  async canSee(cc: CC, user: User): Promise<boolean> {
    const vc = cc.get(VC).vc;
    const { user: viewer } = vc;
    if (viewer == null) {
      return vc.isSystem;
    } else {
      if (await viewer.isSameUser(user)) {
        // The viewer can always see themself.
        return true;
      }

      const [viewerSharingGroupIDs, userSharingGroupIDs] = await Promise.all([
        viewer.getSharingGroupIDs(),
        user.getSharingGroupIDs(),
      ]);
      const viewerSharingGroupIDsSet: Set<string> = new Set(
        viewerSharingGroupIDs,
      );
      for (const sharingGroupID of userSharingGroupIDs) {
        if (viewerSharingGroupIDsSet.has(sharingGroupID)) {
          return true;
        }
      }
      return false;
    }
  },
};
