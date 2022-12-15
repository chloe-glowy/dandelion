import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import type {
  MongodbAidRequestHistoryEvent,
  MongodbAidRequestRecord,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { UserReference } from 'src/server/adapters/mongodb/collections/user/UserModelTypes';

const AidRequestHistoryEventSchema = new Schema<MongodbAidRequestHistoryEvent>({
  action: { enum: ['Add', 'Remove'], type: String },
  actor: UserReference,
  event: {
    enum: [
      'ChangedWhatIsNeeded',
      'ChangedWhoIsItFor',
      'Comment',
      'Completed',
      'Created',
      'Deleted',
      'WorkingOn',
    ],
    type: String,
  },
  eventSpecificData: String,
  newValue: String,
  oldValue: String,
  timestamp: Date,
  undoID: String,
});

const MongodbAidRequestSchema = new Schema<MongodbAidRequestRecord>({
  completed: Boolean,
  createdAt: Date,
  crew: String,
  history: [AidRequestHistoryEventSchema],
  lastUpdated: Date,
  sharingGroup: ObjectId,
  whatIsNeeded: String,
  whatIsNeededSearch: String,
  whoIsItFor: String,
  whoIsItForSearch: String,
  whoIsWorkingOnIt: [ObjectId],
  whoIsWorkingOnItSearch: String,
  whoRecordedIt: String,
  whoRecordedItSearch: String,
  whoRecordedItUsername: String,
});

export const MongodbAidRequestModel = model<MongodbAidRequestRecord>(
  'AidRequest',
  MongodbAidRequestSchema,
);

export const MongodbAidRequestDeletedModel = model<MongodbAidRequestRecord>(
  'AidRequestDeleted',
  MongodbAidRequestSchema,
);
