import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestMarkedAsNotCompletedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedHistoryEventDBProxy';

export class AidRequestMarkedAsNotCompletedHistoryEvent extends AidRequestHistoryEvent {
  public constructor(
    public readonly cc: CC,
    protected readonly dbProxy: AidRequestMarkedAsNotCompletedHistoryEventDBProxy,
  ) {
    super();
  }

  public async supportsUndo(): Promise<boolean> {
    return true;
  }
}
