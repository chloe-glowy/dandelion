import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestDeletedAction } from 'src/server/entities/public/aid_request_action/subtypes/deleted/AidRequestDeletedAction';
import { AidRequestMarkedAsCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_completed/AidRequestMarkedAsCompletedAction';
import { AidRequestMarkedAsNotCompletedAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedAction';
import { AidRequestMarkedAsNotWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnAction';
import { AidRequestMarkedAsWorkingOnAction } from 'src/server/entities/public/aid_request_action/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnAction';
import { AidRequestActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';
import { AidRequestDeleteActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestDeleteActionOptionPresenter';
import { AidRequestMarkAsCompleteActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsCompleteActionOptionPresenter';
import { AidRequestMarkAsIncompleteActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsIncompleteActionOptionPresenter';
import { AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter';
import { AidRequestMarkAsViewerWorkingOnItActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsViewerWorkingOnItActionOptionPresenter';

export class AidRequestActionOptionPresenterFactory {
  public static create(
    action: AidRequestAction,
  ): AidRequestActionOptionPresenter {
    // I would add a .getPresenter() method on AidRequestAction, but that would
    // violate the dependency principle (code dependencies should point towards)
    // higher level components. So, I'm not sure how else to do this.
    if (action instanceof AidRequestDeletedAction) {
      return new AidRequestDeleteActionOptionPresenter();
    } else if (action instanceof AidRequestMarkedAsNotCompletedAction) {
      return new AidRequestMarkAsIncompleteActionOptionPresenter();
    } else if (action instanceof AidRequestMarkedAsCompletedAction) {
      return new AidRequestMarkAsCompleteActionOptionPresenter();
    } else if (action instanceof AidRequestMarkedAsNotWorkingOnAction) {
      return new AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter();
    } else if (action instanceof AidRequestMarkedAsWorkingOnAction) {
      return new AidRequestMarkAsViewerWorkingOnItActionOptionPresenter();
    } else {
      throw new Error(
        'AidRequestActionOptionPresenterFactory cannot handle this action type',
      );
    }
  }
}
