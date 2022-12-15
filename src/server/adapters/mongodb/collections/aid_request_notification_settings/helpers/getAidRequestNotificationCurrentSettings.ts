import { AidRequestNotificationSettings } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsModel';
import { AidRequestNotificationCurrentSettingForGraphQL } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsModelTypes';
import {
  ALL_NOTIFIABLE_EVENTS_ON_AID_REQUESTS,
  NotifiableEventOnAidRequest,
} from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/NotifiableEventOnAidRequest';
import {
  ALL_NOTIFICATION_METHODS,
  NotificationMethod,
} from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/NotificationMethod';
import getCurrentSettingForNotificationOnAidRequest from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/helpers/getCurrentSettingForNotificationOnAidRequest';

export default async function getAidRequestNotificationCurrentSettings(
  notificationSettings: AidRequestNotificationSettings,
): Promise<AidRequestNotificationCurrentSettingForGraphQL[]> {
  const currentSettings: Promise<AidRequestNotificationCurrentSettingForGraphQL>[] =
    [];
  ALL_NOTIFICATION_METHODS.forEach(
    (notificationMethod: NotificationMethod): void => {
      ALL_NOTIFIABLE_EVENTS_ON_AID_REQUESTS.forEach(
        (notifiableEvent: NotifiableEventOnAidRequest): void => {
          currentSettings.push(
            getCurrentSettingForNotificationOnAidRequest({
              notifiableEvent,
              notificationMethod,
              notificationSettings,
            }),
          );
        },
      );
    },
  );
  return await Promise.all(currentSettings);
}
