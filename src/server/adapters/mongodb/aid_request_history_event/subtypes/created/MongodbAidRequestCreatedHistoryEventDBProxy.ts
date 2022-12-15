import { MongodbAidRequestHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/db_proxy/MongodbAidRequestHistoryEventDBProxy';
import { AidRequestCreatedHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEventDBProxy';

export class MongodbAidRequestCreatedHistoryEventDBProxy
  extends MongodbAidRequestHistoryEventDBProxy
  implements AidRequestCreatedHistoryEventDBProxy {}
