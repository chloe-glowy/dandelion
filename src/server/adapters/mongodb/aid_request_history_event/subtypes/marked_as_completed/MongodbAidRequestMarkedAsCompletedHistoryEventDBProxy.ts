import { MongodbAidRequestHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/db_proxy/MongodbAidRequestHistoryEventDBProxy';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestMarkedAsCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_completed/AidRequestMarkedAsCompletedHistoryEvent';
import { AidRequestMarkedAsCompletedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_completed/AidRequestMarkedAsCompletedHistoryEventDBProxy';

export class MongodbAidRequestMarkedAsCompletedHistoryEventDBProxy
  extends MongodbAidRequestHistoryEventDBProxy
  implements AidRequestMarkedAsCompletedHistoryEventDBProxy
{
  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestMarkedAsCompletedHistoryEvent(cc, this);
  }
}
