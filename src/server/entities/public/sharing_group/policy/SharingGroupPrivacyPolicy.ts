import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';

export const SharingGroupPrivacyPolicy = {
  async canSee(cc: CC, sharingGroup: SharingGroup): Promise<boolean> {
    const isSystem = Viewer.getIsSystem(cc);
    const user = Viewer.getUser(cc);
    if (user == null) {
      return isSystem;
    } else {
      return await user.getIsMemberOfSharingGroup(sharingGroup);
    }
  },
};
