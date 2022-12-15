// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { ObjectId } from 'mongodb';
import createHistoryEvent from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/createHistoryEvent';
import getIsUndo from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/getIsUndo';
import type {
  GraphQLAidRequestUpdateArgs,
  GraphQLAidRequestUpdateResult,
} from 'src/server/adapters/graphql/aid_request_old/mutations/edit/UpdateType';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import {
  MongodbAidRequestDeletedModel,
  MongodbAidRequestModel,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';

/**
 * @deprecated Use AidRequest class instead
 */
export default async function delete_(
  args: GraphQLAidRequestUpdateArgs,
): Promise<GraphQLAidRequestUpdateResult> {
  const isAdd = args.input.action === 'Add';
  const isUndo = getIsUndo(args);
  const historyEvent = createHistoryEvent(args, { supportsUndo: false });
  const aidRequest = await MongodbAidRequestModel.findById(args.aidRequestID);
  if (aidRequest == null) {
    throw new Error('Aid request not found: ' + args.aidRequestID);
  }
  if (!isAdd) {
    throw new Error('Un-deleting not supported');
  }
  if (isUndo) {
    throw new Error('Undoing deletion not supported');
  }
  if (!new ObjectId(aidRequest.whoRecordedIt).equals(args.user._id)) {
    throw new Error('Only the person who created a request can delete it');
  }
  const backup = new MongodbAidRequestDeletedModel({
    _id: aidRequest._id,
    completed: aidRequest.completed,
    createdAt: aidRequest.createdAt,
    history: [...aidRequest.history, historyEvent],
    whatIsNeeded: aidRequest.whatIsNeeded,
    whoIsItFor: aidRequest.whoIsItFor,
    whoIsWorkingOnIt: aidRequest.whoIsWorkingOnIt,
    whoRecordedIt: aidRequest.whoRecordedIt,
    whoRecordedItUsername: aidRequest.whoRecordedItUsername,
  });
  const backupSaved = await backup.save();
  if (backupSaved == null) {
    throw new Error('Failed to delete');
  }
  await MongodbAidRequestModel.findByIdAndDelete(args.aidRequestID, {
    new: true,
  });

  const postpublishSummary = 'Deleted';

  return { aidRequest: null, historyEvent, postpublishSummary };
}
