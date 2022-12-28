import { AidRequestDeleteActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestDeleteActionOptionPresenter';
import { AidRequestMarkAsCompleteActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsCompleteActionOptionPresenter';
import { AidRequestMarkAsIncompleteActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsIncompleteActionOptionPresenter';
import { AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter';
import { AidRequestMarkAsViewerWorkingOnItActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsViewerWorkingOnItActionOptionPresenter';

export type AidRequestActionOptionPresenterSubtypeHandlers<T> = Readonly<{
  AidRequestDeleteActionOptionPresenter: (
    option: AidRequestDeleteActionOptionPresenter,
  ) => T;
  AidRequestMarkAsIncompleteActionOptionPresenter: (
    option: AidRequestMarkAsIncompleteActionOptionPresenter,
  ) => T;
  AidRequestMarkAsCompleteActionOptionPresenter: (
    option: AidRequestMarkAsCompleteActionOptionPresenter,
  ) => T;
  AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter: (
    option: AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter,
  ) => T;
  AidRequestMarkAsViewerWorkingOnItActionOptionPresenter: (
    option: AidRequestMarkAsViewerWorkingOnItActionOptionPresenter,
  ) => T;
}>;

export abstract class AidRequestActionOptionPresenter {
  public abstract getOptionLabel(): Promise<string>;
  public abstract getIconName(): Promise<string>;
  public abstract handleSubtype<T>(
    handlers: AidRequestActionOptionPresenterSubtypeHandlers<T>,
  ): T;
}
