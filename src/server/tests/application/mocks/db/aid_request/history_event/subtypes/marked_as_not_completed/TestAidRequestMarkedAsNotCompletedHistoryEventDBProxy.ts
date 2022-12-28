import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestMarkedAsNotCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedHistoryEvent';
import { AidRequestMarkedAsNotCompletedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_not_completed/AidRequestMarkedAsNotCompletedHistoryEventDBProxy';
import { TestAidRequestHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';

export class TestAidRequestMarkedAsNotCompletedHistoryEventDBProxy
  extends TestAidRequestHistoryEventDBProxy
  implements AidRequestMarkedAsNotCompletedHistoryEventDBProxy
{
  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestMarkedAsNotCompletedHistoryEvent(cc, this);
  }
}
