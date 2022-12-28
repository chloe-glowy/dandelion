import { MongodbAidRequestHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/db_proxy/MongodbAidRequestHistoryEventDBProxy';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestCreatedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEvent';
import { AidRequestCreatedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEventDBProxy';

export class MongodbAidRequestCreatedHistoryEventDBProxy
  extends MongodbAidRequestHistoryEventDBProxy
  implements AidRequestCreatedHistoryEventDBProxy
{
  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestCreatedHistoryEvent(cc, this);
  }
}
