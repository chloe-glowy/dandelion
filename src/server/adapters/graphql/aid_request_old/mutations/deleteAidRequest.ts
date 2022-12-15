// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { ObjectId } from 'mongodb';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import {
  MongodbAidRequestDeletedModel,
  MongodbAidRequestModel,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type {
  AidRequestActionType,
  MongodbAidRequestHistoryEvent,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';

export default async function deleteAidRequest(
  user: Express.User,
  aidRequestID: string,
  historyEvent: MongodbAidRequestHistoryEvent,
  action: AidRequestActionType,
  undoID: string | null,
): Promise<void> {
  const aidRequest = await MongodbAidRequestModel.findById(aidRequestID);
  if (aidRequest == null) {
    throw new Error('Aid request not found: ' + aidRequestID);
  }
  if (action !== 'Add') {
    throw new Error('Un-deleting not supported');
  }
  if (undoID != null) {
    throw new Error('Undoing deletion not supported');
  }
  if (!new ObjectId(aidRequest.whoRecordedIt).equals(user._id)) {
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
  await MongodbAidRequestModel.findByIdAndDelete(aidRequestID, {
    new: true,
  });
}
