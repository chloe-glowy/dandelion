import type { UpdateQuery } from 'mongoose';

import type { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';

export default function getHistoryUpdate(
  historyEventID: string,
): UpdateQuery<MongodbAidRequestRecord> {
  return { $pull: { history: { _id: historyEventID } } };
}
