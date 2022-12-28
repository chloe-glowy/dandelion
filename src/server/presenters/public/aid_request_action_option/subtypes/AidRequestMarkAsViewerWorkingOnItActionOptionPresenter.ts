import {
  AidRequestActionOptionPresenter,
  AidRequestActionOptionPresenterSubtypeHandlers,
} from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';

export class AidRequestMarkAsViewerWorkingOnItActionOptionPresenter extends AidRequestActionOptionPresenter {
  public async getOptionLabel(): Promise<string> {
    return "I'm working on it";
  }
  public async getIconName(): Promise<string> {
    return 'raised-hand';
  }

  public handleSubtype<T>(
    handlers: AidRequestActionOptionPresenterSubtypeHandlers<T>,
  ): T {
    return handlers.AidRequestMarkAsViewerWorkingOnItActionOptionPresenter(
      this,
    );
  }
}
