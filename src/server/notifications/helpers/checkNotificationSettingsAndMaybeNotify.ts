import { NotifiableEventOnAidRequest } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/NotifiableEventOnAidRequest';
import { NotificationMethod } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/NotificationMethod';
import getAidRequestNotificationSettings from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/helpers/getAidRequestNotificationSettings';
import getCurrentSettingForNotificationOnAidRequest from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/helpers/getCurrentSettingForNotificationOnAidRequest';
import analytics from 'src/server/deprecated/analytics';
import { NotifySpecificRecipientArgs } from 'src/server/notifications/NotifyArgs';

type Args = {
  args: Omit<
    NotifySpecificRecipientArgs,
    'req' | 'comment' | 'commenter' | 'type'
  >;
  notify: (reason: string) => Promise<void>;
  notifiableEvent: NotifiableEventOnAidRequest;
  notificationMethod: NotificationMethod;
};

export default async function checkNotificationSettingsAndMaybeNotify({
  args,
  notify,
  notifiableEvent,
  notificationMethod,
}: Args): Promise<void> {
  const notificationSettings = await getAidRequestNotificationSettings(
    args.recipient,
    args.aidRequest._id.toString(),
  );
  const { subscribeOrUnsubscribe, reason } =
    await getCurrentSettingForNotificationOnAidRequest({
      extraRecipientIDs: args.extraRecipientIDs,
      notifiableEvent,
      notificationMethod,
      notificationSettings,
    });

  const shouldNotify = subscribeOrUnsubscribe === 'Subscribe';

  analytics.track({
    event: `${shouldNotify ? 'Sending' : 'Not sending'} notification`,
    properties: {
      aidRequestID: args.aidRequest._id.toString(),
      notifiableEvent,
      notificationMethod,
      reason,
    },
    user: args.recipient,
  });

  if (shouldNotify) {
    await notify(reason);
  }
}
