import { AidRequestEditPermissionPolicyForAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/AidRequestEditPermissionPolicyForAction';

export class AidRequestEditPermissionPolicyForCommentAction extends AidRequestEditPermissionPolicyForAction {
  public async canEditAidRequest(): Promise<boolean> {
    return true;
  }
}
