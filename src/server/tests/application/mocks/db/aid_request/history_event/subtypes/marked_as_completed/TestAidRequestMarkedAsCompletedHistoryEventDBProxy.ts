import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestMarkedAsCompletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_completed/AidRequestMarkedAsCompletedHistoryEvent';
import { AidRequestMarkedAsCompletedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_completed/AidRequestMarkedAsCompletedHistoryEventDBProxy';
import { TestAidRequestHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';

export class TestAidRequestMarkedAsCompletedHistoryEventDBProxy
  extends TestAidRequestHistoryEventDBProxy
  implements AidRequestMarkedAsCompletedHistoryEventDBProxy
{
  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestMarkedAsCompletedHistoryEvent(cc, this);
  }
}
