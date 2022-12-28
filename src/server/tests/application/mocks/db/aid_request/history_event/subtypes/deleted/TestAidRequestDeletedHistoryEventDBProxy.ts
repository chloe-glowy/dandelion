import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestDeletedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/deleted/AidRequestDeletedHistoryEvent';
import { AidRequestDeletedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/deleted/AidRequestDeletedHistoryEventDBProxy';
import { TestAidRequestHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';

export class TestAidRequestDeletedHistoryEventDBProxy
  extends TestAidRequestHistoryEventDBProxy
  implements AidRequestDeletedHistoryEventDBProxy
{
  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestDeletedHistoryEvent(cc, this);
  }
}
