import { AidRequestReminderModel } from 'src/server/adapters/mongodb/collections/aid_request_reminder/AidRequestReminderModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import executeReminder from 'src/server/deprecated/executeReminder';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import setTimeoutSafe from 'src/server/to_clean/setTimeoutSafe';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import getErrorMessage from 'src/shared/to_clean/utils/error/getErrorMessage';

export default async function executeReminders(): Promise<void> {
  const reminders = await AidRequestReminderModel.find({
    scheduledFor: { $lt: new Date() },
  });
  reminders.forEach((reminder) =>
    setTimeoutSafe('executeReminders:executeReminder', async () => {
      try {
        await executeReminder(reminder);
      } catch (e) {
        console.log('executeReminders error: ' + getErrorMessage(e));
      }
    }),
  );
}
