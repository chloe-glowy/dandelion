import { CC } from 'src/server/context_container/public/ContextContainer';
import {
  AidRequestHistoryEvent,
  AidRequestHistoryEventSubtypeHandlers,
} from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestCreatedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEventDBProxy';

export class AidRequestCreatedHistoryEvent extends AidRequestHistoryEvent {
  public constructor(
    public readonly cc: CC,
    protected readonly dbProxy: AidRequestCreatedHistoryEventDBProxy,
  ) {
    super();
  }

  public async supportsUndo(): Promise<boolean> {
    return false;
  }

  public handleSubtype<T>(
    handlers: AidRequestHistoryEventSubtypeHandlers<T>,
  ): T {
    return handlers.AidRequestCreatedHistoryEvent(this);
  }
}
