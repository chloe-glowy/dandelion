import { AidRequestCreatedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEventDBProxy';
import { TestAidRequestHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';

export class TestAidRequestCreatedHistoryEventDBProxy
  extends TestAidRequestHistoryEventDBProxy
  implements AidRequestCreatedHistoryEventDBProxy {}
