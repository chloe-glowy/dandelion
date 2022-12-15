import { model, Schema } from 'mongoose';
import { AidRequestReference } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { AidRequestReminderType } from 'src/server/adapters/mongodb/collections/aid_request_reminder/AidRequestReminderModelTypes';
import { UserReference } from 'src/server/adapters/mongodb/collections/user/UserModelTypes';

const AidRequestReminderSchema = new Schema<AidRequestReminderType>({
  aidRequestID: AidRequestReference,
  howManyDays: Number,
  scheduledFor: Date,
  userID: UserReference,
});

export const AidRequestReminderModel = model<AidRequestReminderType>(
  'AidRequestReminder',
  AidRequestReminderSchema,
);

export const AidRequestReminderDeletedModel = model<AidRequestReminderType>(
  'AidRequestReminderDeleted',
  AidRequestReminderSchema,
);
