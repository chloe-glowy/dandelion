import { AidRequestEditPermissionPolicyForAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/AidRequestEditPermissionPolicyForAction';

export class AidRequestEditPermissionPolicyForMarkedAsNotWorkingOnAction extends AidRequestEditPermissionPolicyForAction {
  public async canEditAidRequest(): Promise<boolean> {
    return true;
  }
}
