import { AidRequestEditPermissionPolicyForAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/AidRequestEditPermissionPolicyForAction';

export class AidRequestEditPermissionPolicyForDeletedAction extends AidRequestEditPermissionPolicyForAction {
  public async canEditAidRequest(): Promise<boolean> {
    const creator = await this.aidRequest.getWhoRecordedIt();
    if (creator === null) {
      return false;
    }
    return await this.user.isSameUser(creator);
  }
}
