import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { User } from 'src/server/entities/public/user/User';

export abstract class AidRequestEditPermissionPolicyForAction {
  public constructor(
    protected readonly cc: CC,
    protected readonly user: User,
    protected readonly aidRequest: AidRequest,
    protected readonly action: AidRequestAction,
  ) {}

  public abstract canEditAidRequest(): Promise<boolean>;
}
