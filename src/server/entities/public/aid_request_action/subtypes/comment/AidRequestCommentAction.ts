import {
  AidRequestAction,
  AidRequestActionSubtypeHandlers,
} from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export class AidRequestCommentAction extends AidRequestAction {
  public constructor(public readonly commentValue: string) {
    super();
  }

  public handleSubtype<T>(handlers: AidRequestActionSubtypeHandlers<T>): T {
    return handlers.AidRequestCommentAction(this);
  }
}
