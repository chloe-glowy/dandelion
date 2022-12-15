import { AidRequestNotificationSettings } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsModel';
import {
  ChangeNotificationSettingEvent,
  ChangeNotificationSettingEventForGraphQL,
} from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsModelTypes';
import graphqlifyAidRequestNotificationSettings from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/helpers/graphqlifyAidRequestNotificationSettings';

export default function graphqlifyAidRequestChangeNotificationSettingHistoryEvent({
  user,
  event,
  notificationSettings,
}: {
  user: Express.User;
  event: ChangeNotificationSettingEvent;
  notificationSettings: AidRequestNotificationSettings;
}): ChangeNotificationSettingEventForGraphQL {
  return {
    ...event,
    settings: async () =>
      graphqlifyAidRequestNotificationSettings(user, notificationSettings),
  };
}
