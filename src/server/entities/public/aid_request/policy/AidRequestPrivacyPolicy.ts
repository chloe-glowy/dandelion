import { CC } from 'src/server/context_container/public/ContextContainer';
import { VC } from 'src/server/entities/private/vc/ViewerContext';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';

export const AidRequestPrivacyPolicy = {
  async canSee(cc: CC, aidRequest: AidRequest): Promise<boolean> {
    const vc = cc.get(VC).vc;
    const { user } = vc;
    if (user == null) {
      return vc.isSystem;
    } else {
      const aidRequestSharingGroupID = await aidRequest.getSharingGroupID();
      return await user.getIsMemberOfSharingGroupID(aidRequestSharingGroupID);
    }
  },
};
