import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export class AidRequestChangedWhoIsItForAction extends AidRequestAction {
  public constructor(
    public readonly oldValue: string,
    public readonly newValue: string,
  ) {
    super();
  }
}
