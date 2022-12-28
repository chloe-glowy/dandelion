import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestMarkedAsWorkingOnHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEvent';
import { AidRequestMarkedAsWorkingOnHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEventDBProxy';
import { TestAidRequestHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';

export class TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy
  extends TestAidRequestHistoryEventDBProxy
  implements AidRequestMarkedAsWorkingOnHistoryEventDBProxy
{
  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestMarkedAsWorkingOnHistoryEvent(cc, this);
  }
}
