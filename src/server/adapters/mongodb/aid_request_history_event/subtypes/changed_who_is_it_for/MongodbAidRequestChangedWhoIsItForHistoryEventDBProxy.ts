import { MongodbAidRequestHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/db_proxy/MongodbAidRequestHistoryEventDBProxy';
import { AidRequestChangedWhoIsItForHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForHistoryEventDBProxy';

export class MongodbAidRequestChangedWhoIsItForHistoryEventDBProxy
  extends MongodbAidRequestHistoryEventDBProxy
  implements AidRequestChangedWhoIsItForHistoryEventDBProxy
{
  public async getOldValue(): Promise<string> {
    return this.event.oldValue ?? '';
  }

  public async getNewValue(): Promise<string> {
    return this.event.newValue ?? '';
  }
}
