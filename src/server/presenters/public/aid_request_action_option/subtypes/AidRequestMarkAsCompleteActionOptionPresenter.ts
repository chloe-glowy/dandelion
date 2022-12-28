import {
  AidRequestActionOptionPresenter,
  AidRequestActionOptionPresenterSubtypeHandlers,
} from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';

export class AidRequestMarkAsCompleteActionOptionPresenter extends AidRequestActionOptionPresenter {
  public async getOptionLabel(): Promise<string> {
    return 'Mark as complete';
  }
  public async getIconName(): Promise<string> {
    return 'check';
  }

  public handleSubtype<T>(
    handlers: AidRequestActionOptionPresenterSubtypeHandlers<T>,
  ): T {
    return handlers.AidRequestMarkAsCompleteActionOptionPresenter(this);
  }
}
