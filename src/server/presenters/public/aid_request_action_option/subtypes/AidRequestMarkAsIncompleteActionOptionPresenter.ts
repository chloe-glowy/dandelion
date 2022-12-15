import { AidRequestActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';

export class AidRequestMarkAsIncompleteActionOptionPresenter
  implements AidRequestActionOptionPresenter
{
  public async getOptionLabel(): Promise<string> {
    return 'Mark as incomplete';
  }
  public async getIconName(): Promise<string> {
    return 'uncheck';
  }
}
