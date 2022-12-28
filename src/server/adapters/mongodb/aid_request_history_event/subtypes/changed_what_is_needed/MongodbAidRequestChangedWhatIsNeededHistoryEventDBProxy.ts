import { MongodbAidRequestHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/db_proxy/MongodbAidRequestHistoryEventDBProxy';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestChangedWhatIsNeededHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededHistoryEvent';
import { AidRequestChangedWhatIsNeededHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededHistoryEventDBProxy';

export class MongodbAidRequestChangedWhatIsNeededHistoryEventDBProxy
  extends MongodbAidRequestHistoryEventDBProxy
  implements AidRequestChangedWhatIsNeededHistoryEventDBProxy
{
  public async getOldValue(): Promise<string> {
    return this.event.oldValue ?? '';
  }

  public async getNewValue(): Promise<string> {
    return this.event.newValue ?? '';
  }

  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestChangedWhatIsNeededHistoryEvent(cc, this);
  }
}
