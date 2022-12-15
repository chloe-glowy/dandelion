import createHistoryEvent from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/createHistoryEvent';
import isUndo from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/getIsUndo';
import updateAidRequest from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/updateAidRequest';
import type {
  GraphQLAidRequestUpdateArgs,
  GraphQLAidRequestUpdateResult,
} from 'src/server/adapters/graphql/aid_request_old/mutations/edit/UpdateType';

/**
 * @deprecated Use AidRequest class instead
 */
export default async function complete(
  args: GraphQLAidRequestUpdateArgs,
): Promise<GraphQLAidRequestUpdateResult> {
  const isAdd = args.input.action === 'Add';
  const historyEvent = createHistoryEvent(args, { supportsUndo: true });

  const historyUpdate = isUndo(args)
    ? { $pull: { history: { undoID: args.undoID } } }
    : { $push: { history: historyEvent } };

  const completedFieldUpdate = {
    completed: isAdd !== isUndo(args),
  };

  const aidRequest = await updateAidRequest(args.aidRequestID, {
    ...historyUpdate,
    ...completedFieldUpdate,
  });

  const postpublishSummary = isAdd
    ? 'Marked as complete'
    : 'Marked as incomplete';

  return { aidRequest, historyEvent, postpublishSummary };
}
