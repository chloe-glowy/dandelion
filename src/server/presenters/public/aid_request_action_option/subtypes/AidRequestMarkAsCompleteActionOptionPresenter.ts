import { AidRequestActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';

export class AidRequestMarkAsCompleteActionOptionPresenter
  implements AidRequestActionOptionPresenter
{
  public async getOptionLabel(): Promise<string> {
    return 'Mark as complete';
  }
  public async getIconName(): Promise<string> {
    return 'check';
  }
}
