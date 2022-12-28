import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestEditPermissionPolicyForAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/AidRequestEditPermissionPolicyForAction';
import { AidRequestEditPermissionPolicyForChangedWhatIsNeededAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/changed_what_is_needed/AidRequestEditPermissionPolicyForChangedWhatIsNeededAction';
import { AidRequestEditPermissionPolicyForChangedWhoIsItForAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/changed_who_is_it_for/AidRequestEditPermissionPolicyForChangedWhoIsItForAction';
import { AidRequestEditPermissionPolicyForCommentAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/comment/AidRequestEditPermissionPolicyForCommentAction';
import { AidRequestEditPermissionPolicyForCreatedAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/created/AidRequestEditPermissionPolicyForCreatedAction';
import { AidRequestEditPermissionPolicyForDeletedAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/deleted/AidRequestEditPermissionPolicyForDeletedAction';
import { AidRequestEditPermissionPolicyForMarkedAsCompletedAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/marked_as_completed/AidRequestEditPermissionPolicyForMarkedAsCompletedAction';
import { AidRequestEditPermissionPolicyForMarkedAsNotCompletedAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/marked_as_not_completed/AidRequestEditPermissionPolicyForMarkedAsNotCompletedAction';
import { AidRequestEditPermissionPolicyForMarkedAsNotWorkingOnAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/marked_as_not_working_on/AidRequestEditPermissionPolicyForMarkedAsNotWorkingOnAction';
import { AidRequestEditPermissionPolicyForMarkedAsWorkingOnAction } from 'src/server/entities/private/aid_request/mutations/edit/permission/subtypes/marked_as_working_on/AidRequestEditPermissionPolicyForMarkedAsWorkingOnAction';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { User } from 'src/server/entities/public/user/User';

export abstract class AidRequestEditPermissionPolicyForActionFactory {
  public static create(
    cc: CC,
    user: User,
    aidRequest: AidRequest,
    action: AidRequestAction,
  ): AidRequestEditPermissionPolicyForAction {
    return action.handleSubtype({
      AidRequestChangedWhatIsNeededAction: () =>
        new AidRequestEditPermissionPolicyForChangedWhatIsNeededAction(
          cc,
          user,
          aidRequest,
          action,
        ),
      AidRequestChangedWhoIsItForAction: () =>
        new AidRequestEditPermissionPolicyForChangedWhoIsItForAction(
          cc,
          user,
          aidRequest,
          action,
        ),
      AidRequestCommentAction: () =>
        new AidRequestEditPermissionPolicyForCommentAction(
          cc,
          user,
          aidRequest,
          action,
        ),
      AidRequestCreatedAction: () =>
        new AidRequestEditPermissionPolicyForCreatedAction(
          cc,
          user,
          aidRequest,
          action,
        ),
      AidRequestDeletedAction: () =>
        new AidRequestEditPermissionPolicyForDeletedAction(
          cc,
          user,
          aidRequest,
          action,
        ),
      AidRequestMarkedAsCompletedAction: () =>
        new AidRequestEditPermissionPolicyForMarkedAsCompletedAction(
          cc,
          user,
          aidRequest,
          action,
        ),
      AidRequestMarkedAsNotCompletedAction: () =>
        new AidRequestEditPermissionPolicyForMarkedAsNotCompletedAction(
          cc,
          user,
          aidRequest,
          action,
        ),
      AidRequestMarkedAsNotWorkingOnAction: () =>
        new AidRequestEditPermissionPolicyForMarkedAsNotWorkingOnAction(
          cc,
          user,
          aidRequest,
          action,
        ),
      AidRequestMarkedAsWorkingOnAction: () =>
        new AidRequestEditPermissionPolicyForMarkedAsWorkingOnAction(
          cc,
          user,
          aidRequest,
          action,
        ),
    });
  }
}
