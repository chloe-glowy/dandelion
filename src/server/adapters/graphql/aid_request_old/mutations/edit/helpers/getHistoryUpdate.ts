// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { UpdateQuery } from 'mongoose';
import isUndo from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/getIsUndo';
import type { GraphQLAidRequestUpdateArgs } from 'src/server/adapters/graphql/aid_request_old/mutations/edit/UpdateType';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type {
  MongodbAidRequestHistoryEvent,
  MongodbAidRequestRecord,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';

/**
 * @deprecated Use AidRequest class instead
 */
export default function getHistoryUpdate(
  args: GraphQLAidRequestUpdateArgs,
  historyEvent: MongodbAidRequestHistoryEvent,
): UpdateQuery<MongodbAidRequestRecord> {
  return isUndo(args)
    ? { $pull: { history: { undoID: args.undoID } } }
    : { $push: { history: historyEvent } };
}
