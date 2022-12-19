import { AidRequestMarkedAsWorkingOnHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/marked_as_working_on/AidRequestMarkedAsWorkingOnHistoryEventDBProxy';
import { TestAidRequestHistoryEventDBProxy } from 'src/server/tests/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';

export class TestAidRequestMarkedAsWorkingOnHistoryEventDBProxy
  extends TestAidRequestHistoryEventDBProxy
  implements AidRequestMarkedAsWorkingOnHistoryEventDBProxy {}
