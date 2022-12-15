import { AidRequestActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';

export class AidRequestDeleteActionOptionPresenter
  implements AidRequestActionOptionPresenter
{
  public async getOptionLabel(): Promise<string> {
    return 'Delete';
  }
  public async getIconName(): Promise<string> {
    return 'delete';
  }
}
