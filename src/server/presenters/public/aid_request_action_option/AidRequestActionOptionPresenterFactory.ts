import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
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
    return action.handleSubtype({
      AidRequestChangedWhatIsNeededAction: () => {
        throw new Error(
          'AidRequestChangedWhatIsNeededAction cannot be rendered as ' +
            'an Option (i.e., cannot be rendered as an item in a dropdown menu)',
        );
      },
      AidRequestChangedWhoIsItForAction: () => {
        throw new Error(
          'AidRequestChangedWhoIsItForAction cannot be rendered as ' +
            'an Option (i.e., cannot be rendered as an item in a dropdown menu)',
        );
      },
      AidRequestCommentAction: () => {
        throw new Error(
          'AidRequestCommentAction cannot be rendered as ' +
            'an Option (i.e., cannot be rendered as an item in a dropdown menu)',
        );
      },
      AidRequestCreatedAction: () => {
        throw new Error(
          'AidRequestCreatedAction cannot be rendered as ' +
            'an Option (i.e., cannot be rendered as an item in a dropdown menu)',
        );
      },
      AidRequestDeletedAction: () =>
        new AidRequestDeleteActionOptionPresenter(),
      AidRequestMarkedAsCompletedAction: () =>
        new AidRequestMarkAsCompleteActionOptionPresenter(),
      AidRequestMarkedAsNotCompletedAction: () =>
        new AidRequestMarkAsIncompleteActionOptionPresenter(),
      AidRequestMarkedAsNotWorkingOnAction: () =>
        new AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter(),
      AidRequestMarkedAsWorkingOnAction: () =>
        new AidRequestMarkAsViewerWorkingOnItActionOptionPresenter(),
    });
  }
}
