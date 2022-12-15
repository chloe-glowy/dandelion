// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { ObjectId } from 'mongodb';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { AidRequestReminderModel } from 'src/server/adapters/mongodb/collections/aid_request_reminder/AidRequestReminderModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import REMINDER_DAYS from 'src/server/adapters/mongodb/collections/aid_request_reminder/REMINDER_DAYS';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import addDays from 'src/shared/to_clean/utils/date/addDays';

/**
 * @deprecated Use AidRequest class instead
 */
export default async function updateReminderBecauseThereWasActivity({
  aidRequestID,
  userID,
}: {
  aidRequestID: ObjectId;
  userID: ObjectId;
}): Promise<void> {
  await AidRequestReminderModel.findOneAndUpdate(
    {
      aidRequestID,
      userID,
    },
    {
      scheduledFor: addDays(new Date(), REMINDER_DAYS),
    },
  );
}
