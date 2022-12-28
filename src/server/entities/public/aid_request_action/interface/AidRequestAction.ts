import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';
import { AidRequestChangedWhoIsItForAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForAction';
import { AidRequestCommentAction } from 'src/server/entities/public/aid_request_action/subtypes/comment/AidRequestCommentAction';
import { AidRequestCreatedAction } from 'src/server/entities/public/aid_request_action/subtypes/created/AidRequestCreatedAction';
import { AidRequestDeletedAction } from 'src/server/entities/public/aid_request_action/subtypes/deleted/AidRequestDeletedAction';
import { AidRequestMarkedAsCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_completed/AidRequestMarkedAsCompletedAction';
import { AidRequestMarkedAsNotCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedAction';
import { AidRequestMarkedAsNotWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnAction';
import { AidRequestMarkedAsWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnAction';

export type AidRequestActionSubtypeHandlers<T> = Readonly<{
  AidRequestCommentAction: (action: AidRequestCommentAction) => T;
  AidRequestMarkedAsNotWorkingOnAction: (
    action: AidRequestMarkedAsNotWorkingOnAction,
  ) => T;
  AidRequestMarkedAsWorkingOnAction: (
    action: AidRequestMarkedAsWorkingOnAction,
  ) => T;
  AidRequestChangedWhatIsNeededAction: (
    action: AidRequestChangedWhatIsNeededAction,
  ) => T;
  AidRequestCreatedAction: (action: AidRequestCreatedAction) => T;
  AidRequestMarkedAsNotCompletedAction: (
    action: AidRequestMarkedAsNotCompletedAction,
  ) => T;
  AidRequestChangedWhoIsItForAction: (
    action: AidRequestChangedWhoIsItForAction,
  ) => T;
  AidRequestMarkedAsCompletedAction: (
    action: AidRequestMarkedAsCompletedAction,
  ) => T;
  AidRequestDeletedAction: (action: AidRequestDeletedAction) => T;
}>;

export abstract class AidRequestAction {
  // TypeScript thinks that any object can be passed as an instance of this
  // class if it's completely empty.
  doNothing__AidRequestAction(): void {
    throw new Error("Don't call this method.");
  }

  public abstract handleSubtype<T>(
    handlers: AidRequestActionSubtypeHandlers<T>,
  ): T;
}
