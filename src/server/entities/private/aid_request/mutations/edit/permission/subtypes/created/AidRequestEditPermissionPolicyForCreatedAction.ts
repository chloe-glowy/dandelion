import { AidRequestEditPermissionPolicyForAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/AidRequestEditPermissionPolicyForAction';

export class AidRequestEditPermissionPolicyForCreatedAction extends AidRequestEditPermissionPolicyForAction {
  public async canEditAidRequest(): Promise<boolean> {
    throw new Error(
      'AidRequestEditPermissionPolicy should not be called for Create actions',
    );
  }
}
