import {
  AidRequestActionOptionPresenter,
  AidRequestActionOptionPresenterSubtypeHandlers,
} from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';

export class AidRequestDeleteActionOptionPresenter extends AidRequestActionOptionPresenter {
  public async getOptionLabel(): Promise<string> {
    return 'Delete';
  }
  public async getIconName(): Promise<string> {
    return 'delete';
  }

  public handleSubtype<T>(
    handlers: AidRequestActionOptionPresenterSubtypeHandlers<T>,
  ): T {
    return handlers.AidRequestDeleteActionOptionPresenter(this);
  }
}
