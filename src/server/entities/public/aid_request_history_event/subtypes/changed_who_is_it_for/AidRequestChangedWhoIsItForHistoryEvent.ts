import { CC } from 'src/server/context_container/public/ContextContainer';
import {
  AidRequestHistoryEvent,
  AidRequestHistoryEventSubtypeHandlers,
} from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestChangedWhoIsItForHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForHistoryEventDBProxy';

export class AidRequestChangedWhoIsItForHistoryEvent extends AidRequestHistoryEvent {
  public constructor(
    public readonly cc: CC,
    protected readonly dbProxy: AidRequestChangedWhoIsItForHistoryEventDBProxy,
  ) {
    super();
  }

  public async getOldValue(): Promise<string> {
    return await this.dbProxy.getOldValue();
  }

  public async getNewValue(): Promise<string> {
    return await this.dbProxy.getNewValue();
  }

  public async supportsUndo(): Promise<boolean> {
    return true;
  }

  public handleSubtype<T>(
    handlers: AidRequestHistoryEventSubtypeHandlers<T>,
  ): T {
    return handlers.AidRequestChangedWhoIsItForHistoryEvent(this);
  }
}
