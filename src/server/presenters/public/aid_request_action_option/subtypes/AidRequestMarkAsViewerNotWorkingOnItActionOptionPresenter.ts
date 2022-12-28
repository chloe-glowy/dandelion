import {
  AidRequestActionOptionPresenter,
  AidRequestActionOptionPresenterSubtypeHandlers,
} from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';

export class AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter extends AidRequestActionOptionPresenter {
  public async getOptionLabel(): Promise<string> {
    return "I'm not working on it";
  }
  public async getIconName(): Promise<string> {
    return 'x';
  }

  public handleSubtype<T>(
    handlers: AidRequestActionOptionPresenterSubtypeHandlers<T>,
  ): T {
    return handlers.AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter(
      this,
    );
  }
}
