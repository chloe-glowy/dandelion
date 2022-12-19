import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export class AidRequestActionWithContext {
  public constructor(
    public readonly action: AidRequestAction,
    public readonly actorID: string,
    public readonly timestamp: Date,
  ) {}
}
