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
import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';
import { AidRequestChangedWhoIsItForAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForAction';
import { AidRequestCommentAction } from 'src/server/entities/public/aid_request_action/subtypes/comment/AidRequestCommentAction';
import { AidRequestCreatedAction } from 'src/server/entities/public/aid_request_action/subtypes/created/AidRequestCreatedAction';
import { AidRequestDeletedAction } from 'src/server/entities/public/aid_request_action/subtypes/deleted/AidRequestDeletedAction';
import { AidRequestMarkedAsCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_completed/AidRequestMarkedAsCompletedAction';
import { AidRequestMarkedAsNotCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedAction';
import { AidRequestMarkedAsNotWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnAction';
import { AidRequestMarkedAsWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnAction';
import { User } from 'src/server/entities/public/user/User';

export abstract class AidRequestEditPermissionPolicyForActionFactory {
  public static create(
    cc: CC,
    user: User,
    aidRequest: AidRequest,
    action: AidRequestAction,
  ): AidRequestEditPermissionPolicyForAction {
    if (action instanceof AidRequestCommentAction) {
      return new AidRequestEditPermissionPolicyForCommentAction(
        cc,
        user,
        aidRequest,
        action,
      );
    }

    if (action instanceof AidRequestMarkedAsNotWorkingOnAction) {
      return new AidRequestEditPermissionPolicyForMarkedAsNotWorkingOnAction(
        cc,
        user,
        aidRequest,
        action,
      );
    }

    if (action instanceof AidRequestMarkedAsWorkingOnAction) {
      return new AidRequestEditPermissionPolicyForMarkedAsWorkingOnAction(
        cc,
        user,
        aidRequest,
        action,
      );
    }

    if (action instanceof AidRequestChangedWhatIsNeededAction) {
      return new AidRequestEditPermissionPolicyForChangedWhatIsNeededAction(
        cc,
        user,
        aidRequest,
        action,
      );
    }

    if (action instanceof AidRequestCreatedAction) {
      return new AidRequestEditPermissionPolicyForCreatedAction(
        cc,
        user,
        aidRequest,
        action,
      );
    }

    if (action instanceof AidRequestMarkedAsNotCompletedAction) {
      return new AidRequestEditPermissionPolicyForMarkedAsNotCompletedAction(
        cc,
        user,
        aidRequest,
        action,
      );
    }

    if (action instanceof AidRequestChangedWhoIsItForAction) {
      return new AidRequestEditPermissionPolicyForChangedWhoIsItForAction(
        cc,
        user,
        aidRequest,
        action,
      );
    }

    if (action instanceof AidRequestMarkedAsCompletedAction) {
      return new AidRequestEditPermissionPolicyForMarkedAsCompletedAction(
        cc,
        user,
        aidRequest,
        action,
      );
    }

    if (action instanceof AidRequestDeletedAction) {
      return new AidRequestEditPermissionPolicyForDeletedAction(
        cc,
        user,
        aidRequest,
        action,
      );
    }

    throw new Error(
      'AidRequestEditPermissionPolicyForActionFactory -- Unrecognized event type',
    );
  }
}
