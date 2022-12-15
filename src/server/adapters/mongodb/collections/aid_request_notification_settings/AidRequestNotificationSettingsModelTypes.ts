import type { ObjectId } from 'mongodb';
import { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import type { NotifiableEventOnAidRequest } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/NotifiableEventOnAidRequest';
import type { NotificationMethod } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/NotificationMethod';
import { SubscribeOrUnsubscribe } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/SubscribeOrUnsubscribe';

type NotificationSettingDescriptor = {
  notifiableEvent: NotifiableEventOnAidRequest;
  notificationMethod: NotificationMethod;
  subscribeOrUnsubscribe: SubscribeOrUnsubscribe;
};

export type ChangeNotificationSettingEvent = NotificationSettingDescriptor & {
  timestamp: Date;
};

export type ChangeNotificationSettingEventForGraphQL =
  ChangeNotificationSettingEvent & {
    settings: () => Promise<AidRequestNotificationSettingsTypeForGraphQL>;
  };

export type AidRequestNotificationSettingsType = {
  _id: string;
  aidRequestID: ObjectId;
  history: ChangeNotificationSettingEvent[];
  userID: ObjectId;
};

export type AidRequestNotificationCurrentSettingForGraphQL =
  NotificationSettingDescriptor & {
    reason: string;
    title: string;
    onlyIfSubscribedToRequest: boolean;
  };

export type AidRequestNotificationSettingsTypeForGraphQL = {
  _id: string;
  aidRequest: () => Promise<MongodbAidRequestRecord | null>;
  history: ChangeNotificationSettingEventForGraphQL[];
  settings: () => Promise<AidRequestNotificationCurrentSettingForGraphQL[]>;
  user: () => Promise<Express.User>;
};
