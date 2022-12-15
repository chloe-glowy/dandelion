// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { ObjectId } from 'mongodb';
import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
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
import getHistoryEventSummary from 'src/server/adapters/mongodb/collections/aid_request/helpers/getHistoryEventSummary';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import afterRequestIsComplete from 'src/server/to_clean/afterRequestIsComplete';

type StringFieldSpecs = {
  fieldName: keyof MongodbAidRequest;
};

/**
 * @deprecated Use AidRequest class instead
 */
export default async function changeStringField(
  args: GraphQLAidRequestUpdateArgs,
  { fieldName }: StringFieldSpecs,
): Promise<GraphQLAidRequestUpdateResult> {
  const isUndo = getIsUndo(args);
  let newValue: string = args.input.eventSpecificData ?? 'unknown';
  const oldValue = args.originalAidRequest[fieldName];
  if (!newValue && !isUndo) {
    throw new Error(`Cannot change ${fieldName} to empty string`);
  }

  if (!isUndo && oldValue === newValue) {
    return {
      aidRequest: args.originalAidRequest,
      historyEvent:
        args.originalAidRequest.history[
          args.originalAidRequest.history.length - 1
        ],
      postpublishSummary: '',
    };
  }

  if (isUndo) {
    const historyEvent = args.originalAidRequest.history.find(
      (historyEvent) => historyEvent.undoID === args.undoID,
    );
    newValue = historyEvent?.oldValue ?? 'unknown';
  }

  const historyEvent = {
    ...createHistoryEvent(args, { supportsUndo: true }),
    newValue,
    oldValue,
  };
  const historyUpdate = getHistoryUpdate(args, historyEvent);

  const fieldUpdate = {
    [fieldName]: newValue,
  };

  const aidRequest = await updateAidRequest(args.aidRequestID, {
    ...historyUpdate,
    ...fieldUpdate,
  });

  const postpublishSummary = await getHistoryEventSummary(
    args.user,
    historyEvent,
  );

  if (!isUndo) {
    afterRequestIsComplete({
      callback: () =>
        updateReminderBecauseThereWasActivity({
          aidRequestID: new ObjectId(args.originalAidRequest._id),
          userID: args.user._id,
        }),
      loggingTag: 'changeStringField:updateReminderBecauseThereWasActivity',
      req: args.req,
    });
  }

  return { aidRequest, historyEvent, postpublishSummary };
}
