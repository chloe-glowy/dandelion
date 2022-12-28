import {
  AidRequestActionOptionPresenter,
  AidRequestActionOptionPresenterSubtypeHandlers,
} from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';

export class AidRequestMarkAsIncompleteActionOptionPresenter extends AidRequestActionOptionPresenter {
  public async getOptionLabel(): Promise<string> {
    return 'Mark as incomplete';
  }
  public async getIconName(): Promise<string> {
    return 'uncheck';
  }

  public handleSubtype<T>(
    handlers: AidRequestActionOptionPresenterSubtypeHandlers<T>,
  ): T {
    return handlers.AidRequestMarkAsIncompleteActionOptionPresenter(this);
  }
}
