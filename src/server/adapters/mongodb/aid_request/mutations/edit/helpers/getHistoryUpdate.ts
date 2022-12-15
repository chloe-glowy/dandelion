import type { UpdateQuery } from 'mongoose';

import type {
  MongodbAidRequestHistoryEvent,
  MongodbAidRequestRecord,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';

export default function getHistoryUpdate(
  historyEvent: Omit<MongodbAidRequestHistoryEvent, '_id'>,
): UpdateQuery<MongodbAidRequestRecord> {
  return { $push: { history: historyEvent } };
}
