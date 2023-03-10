import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestMarkedAsWorkingOnHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEventDBProxy';

export class AidRequestMarkedAsWorkingOnHistoryEvent extends AidRequestHistoryEvent {
  public constructor(
    public readonly cc: CC,
    protected readonly dbProxy: AidRequestMarkedAsWorkingOnHistoryEventDBProxy,
  ) {
    super();
  }

  public async supportsUndo(): Promise<boolean> {
    return true;
  }
}
