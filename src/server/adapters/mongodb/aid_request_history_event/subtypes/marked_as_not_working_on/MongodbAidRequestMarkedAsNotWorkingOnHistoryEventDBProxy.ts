import { MongodbAidRequestHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/db_proxy/MongodbAidRequestHistoryEventDBProxy';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestMarkedAsNotWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnHistoryEvent';
import { AidRequestMarkedAsNotWorkingOnHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_working_on/AidRequestMarkedAsNotWorkingOnHistoryEventDBProxy';

export class MongodbAidRequestMarkedAsNotWorkingOnHistoryEventDBProxy
  extends MongodbAidRequestHistoryEventDBProxy
  implements AidRequestMarkedAsNotWorkingOnHistoryEventDBProxy
{
  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestMarkedAsNotWorkingOnHistoryEvent(cc, this);
  }
}
