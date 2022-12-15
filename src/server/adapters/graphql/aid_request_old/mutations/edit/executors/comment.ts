// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { ObjectId } from 'mongodb';
import updateReminderBecauseThereWasActivity from 'src/server/adapters/graphql/aid_request_old/mutations/edit/executors/updateReminderBecauseThereWasActivity';
import createHistoryEvent from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/createHistoryEvent';
import getHistoryUpdate from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/getHistoryUpdate';
import getIsUndo from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/getIsUndo';
import updateAidRequest from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/updateAidRequest';
import type {
  GraphQLAidRequestUpdateArgs,
  GraphQLAidRequestUpdateResult,
} from 'src/server/adapters/graphql/aid_request_old/mutations/edit/UpdateType';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import notify from 'src/server/notifications/notify';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import afterRequestIsComplete from 'src/server/to_clean/afterRequestIsComplete';

/**
 * @deprecated Use AidRequest class instead
 */
export default async function comment(
  args: GraphQLAidRequestUpdateArgs,
): Promise<GraphQLAidRequestUpdateResult> {
  const isAdd = args.input.action === 'Add';
  const isUndo = getIsUndo(args);

  if (!isAdd) {
    throw new Error('editAidRequest only supports Add action for Comments');
  }

  const historyEvent = createHistoryEvent(args, { supportsUndo: true });
  const historyUpdate = getHistoryUpdate(args, historyEvent);
  const postpublishSummary = 'Added comment';
  const aidRequest = await updateAidRequest(args.aidRequestID, historyUpdate);

  if (!isUndo) {
    notify({
      aidRequest,
      comment: historyEvent,
      commenter: args.user,
      req: args.req,
      type: 'NewComment',
    });
  }

  if (!isUndo) {
    afterRequestIsComplete({
      callback: () =>
        updateReminderBecauseThereWasActivity({
          aidRequestID: new ObjectId(args.aidRequestID),
          userID: args.user._id,
        }),
      loggingTag: 'comment:updateReminderBecauseThereWasActivity',
      req: args.req,
    });
  }

  return { aidRequest, historyEvent, postpublishSummary };
}
