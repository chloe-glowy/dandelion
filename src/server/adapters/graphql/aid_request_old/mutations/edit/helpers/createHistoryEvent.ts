// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { nanoid } from 'nanoid';
import isUndo from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/getIsUndo';
import type { GraphQLAidRequestUpdateArgs } from 'src/server/adapters/graphql/aid_request_old/mutations/edit/UpdateType';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';

type HistoryEventArgs = {
  supportsUndo: boolean;
};

/**
 * @deprecated Use AidRequest class instead
 */
export default function createHistoryEvent(
  args: GraphQLAidRequestUpdateArgs,
  { supportsUndo }: HistoryEventArgs,
): Omit<MongodbAidRequestHistoryEvent, '_id'> {
  const { action, event, eventSpecificData } = args.input;
  const canUndo = supportsUndo && !isUndo(args);
  return {
    action,
    actor: args.user._id,
    event,
    eventSpecificData,
    timestamp: new Date(),
    undoID: canUndo ? nanoid() : null,
  };
}
