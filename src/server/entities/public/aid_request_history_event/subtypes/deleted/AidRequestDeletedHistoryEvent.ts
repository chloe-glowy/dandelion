import { CC } from 'src/server/context_container/public/ContextContainer';
import {
  AidRequestHistoryEvent,
  AidRequestHistoryEventSubtypeHandlers,
} from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestDeletedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/deleted/AidRequestDeletedHistoryEventDBProxy';

export class AidRequestDeletedHistoryEvent extends AidRequestHistoryEvent {
  public constructor(
    public readonly cc: CC,
    protected readonly dbProxy: AidRequestDeletedHistoryEventDBProxy,
  ) {
    super();
  }

  public async supportsUndo(): Promise<boolean> {
    return false;
  }

  public handleSubtype<T>(
    handlers: AidRequestHistoryEventSubtypeHandlers<T>,
  ): T {
    return handlers.AidRequestDeletedHistoryEvent(this);
  }
}
