import {
  AidRequestChangeNotificationSettingsEventGraphQLType,
  AidRequestEditNotificationSettingsInputType,
} from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsGraphQLTypes';
import { AidRequestNotificationSettingsModel } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsModel';
import {
  ChangeNotificationSettingEvent,
  ChangeNotificationSettingEventForGraphQL,
} from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsModelTypes';
import { NotifiableEventOnAidRequest } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/NotifiableEventOnAidRequest';
import { NotificationMethod } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/NotificationMethod';
import { SubscribeOrUnsubscribe } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/SubscribeOrUnsubscribe';
import getAidRequestNotificationSettings from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/helpers/getAidRequestNotificationSettings';
import graphqlifyAidRequestChangeNotificationSettingHistoryEvent from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/helpers/graphqlifyAidRequestChangeNotificationSettingHistoryEvent';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

async function editNotificationSettingResolver(
  _: unknown,
  {
    aidRequestID,
    input,
  }: {
    aidRequestID: string;
    input: {
      notificationMethod: NotificationMethod;
      notifiableEvent: NotifiableEventOnAidRequest;
      subscribeOrUnsubscribe: SubscribeOrUnsubscribe;
    };
  },
  req: Express.Request,
): Promise<ChangeNotificationSettingEventForGraphQL> {
  const user = assertLoggedIn(req, 'Create aid request');
  const notificationSettings = await getAidRequestNotificationSettings(
    user,
    aidRequestID,
  );

  const event: ChangeNotificationSettingEvent = {
    ...input,
    timestamp: new Date(),
  };

  const updatedNotificationSettings =
    await AidRequestNotificationSettingsModel.findByIdAndUpdate(
      notificationSettings._id,
      {
        $push: { history: event },
      },
      { new: true },
    );

  if (updatedNotificationSettings == null) {
    throw new Error('Unable to update notification settings');
  }

  return graphqlifyAidRequestChangeNotificationSettingHistoryEvent({
    event,
    notificationSettings: updatedNotificationSettings,
    user,
  });
}

const editNotificationSetting = {
  args: {
    aidRequestID: 'String!',
    input: AidRequestEditNotificationSettingsInputType,
  },
  resolve: editNotificationSettingResolver,
  type: AidRequestChangeNotificationSettingsEventGraphQLType,
};

export default editNotificationSetting;
