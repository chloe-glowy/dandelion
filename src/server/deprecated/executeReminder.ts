import aidRequestHasBeenDeleted from 'src/server/adapters/mongodb/collections/aid_request/helpers/aidRequestHasBeenDeleted';
import loadAidRequestForViewer from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
import {
  AidRequestReminderDeletedModel,
  AidRequestReminderModel,
} from 'src/server/adapters/mongodb/collections/aid_request_reminder/AidRequestReminderModel';
import { AidRequestReminderType } from 'src/server/adapters/mongodb/collections/aid_request_reminder/AidRequestReminderModelTypes';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
import sendEmail from 'src/server/deprecated/email/sendEmail';
import checkNotificationSettingsAndMaybeNotify from 'src/server/notifications/helpers/checkNotificationSettingsAndMaybeNotify';
import getAidRequestTitle from 'src/shared/to_clean/aid_request/getAidRequestTitle';
import aidRequestDetailUrl from 'src/shared/to_clean/urls/aidRequestDetailUrl';
import aidRequestNotificationSettingsUrl from 'src/shared/to_clean/urls/aidRequestNotificationSettingsUrl';

export default async function executeReminder(
  reminder: AidRequestReminderType,
): Promise<void> {
  const user = await UserModel.findById(reminder.userID);
  if (user == null) {
    throw new Error('No user found for reminder ' + reminder._id.toString());
  }
  const aidRequestID = reminder.aidRequestID.toString();
  const hasBeenDeleted = await aidRequestHasBeenDeleted(aidRequestID);
  if (hasBeenDeleted) {
    console.log(
      `Found orphaned AidRequestReminder -- deleting ${
        reminder._id
      } (for user ${reminder.userID.toString()} and aidRequestID ${aidRequestID})`,
    );
    await AidRequestReminderModel.findByIdAndDelete(reminder._id);
    return;
  }
  const aidRequest = await loadAidRequestForViewer(user, aidRequestID);
  await checkNotificationSettingsAndMaybeNotify({
    args: {
      aidRequest,
      extraRecipientIDs: [reminder.userID.toString()],
      recipient: user,
    },
    notifiableEvent: 'Reminder',
    notificationMethod: 'Email',
    notify: async (reason: string) => {
      await sendEmail({
        recipient: user,
        templateID: 'REMINDER_NOTIFICATION_TEMPLATE_ID',
        templateProps: {
          aid_request_title: getAidRequestTitle(aidRequest),
          notification_reason: reason,
          notification_settings_url:
            aidRequestNotificationSettingsUrl(aidRequestID),
          reminder_reason:
            "This is a friendly reminder that you marked yourself as working on this request and it's been 7 days since your last activity. ",
          request_url: aidRequestDetailUrl(aidRequestID),
        },
      });
    },
  });
  await new AidRequestReminderDeletedModel({
    _id: reminder._id,
    aidRequestID: reminder.aidRequestID,
    howManyDays: reminder.howManyDays,
    scheduledFor: reminder.scheduledFor,
    userID: reminder.userID,
  }).save();
  await AidRequestReminderModel.findByIdAndDelete(reminder._id);
}
