import {
  AidRequestAction,
  AidRequestActionSubtypeHandlers,
} from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export class AidRequestCreatedAction extends AidRequestAction {
  public handleSubtype<T>(handlers: AidRequestActionSubtypeHandlers<T>): T {
    return handlers.AidRequestCreatedAction(this);
  }
}
