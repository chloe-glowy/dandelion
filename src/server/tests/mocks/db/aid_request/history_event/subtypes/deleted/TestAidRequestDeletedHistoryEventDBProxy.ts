import { AidRequestDeletedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/deleted/AidRequestDeletedHistoryEventDBProxy';
import { TestAidRequestHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';

export class TestAidRequestDeletedHistoryEventDBProxy
  extends TestAidRequestHistoryEventDBProxy
  implements AidRequestDeletedHistoryEventDBProxy {}
