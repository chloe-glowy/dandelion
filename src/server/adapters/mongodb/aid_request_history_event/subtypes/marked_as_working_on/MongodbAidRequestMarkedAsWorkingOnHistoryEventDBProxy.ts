import { MongodbAidRequestHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/db_proxy/MongodbAidRequestHistoryEventDBProxy';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestMarkedAsWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEvent';
import { AidRequestMarkedAsWorkingOnHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEventDBProxy';

export class MongodbAidRequestMarkedAsWorkingOnHistoryEventDBProxy
  extends MongodbAidRequestHistoryEventDBProxy
  implements AidRequestMarkedAsWorkingOnHistoryEventDBProxy
{
  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestMarkedAsWorkingOnHistoryEvent(cc, this);
  }
}
