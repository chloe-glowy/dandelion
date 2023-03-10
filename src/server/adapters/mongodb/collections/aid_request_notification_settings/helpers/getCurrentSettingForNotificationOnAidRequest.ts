import type { ObjectId } from 'mongodb';
import {
  AidRequestHistoryEventType,
  PRIORITY_HISTORY_EVENTS,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';
import getHistoryWithoutRemovals from 'src/server/adapters/mongodb/collections/aid_request/helpers/getHistoryWithoutRemovals';
import { maybeLoadAidRequestForViewer } from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
import type { AidRequestNotificationSettingsType } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsModelTypes';
import {
  AidRequestNotificationCurrentSettingForGraphQL,
  ChangeNotificationSettingEvent,
} from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsModelTypes';
import AidRequestNotificationsConfig, {
  EventConfig,
} from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/config/AidRequestNotificationsConfig';
import { NotifiableEventOnAidRequest } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/NotifiableEventOnAidRequest';
import { NotificationMethod } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/enums/NotificationMethod';
import getDefaultNotificationSetting from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/helpers/getDefaultNotificationSetting';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import ago from 'src/shared/presenter_utils/ago';

type Args = {
  extraRecipientIDs?: Array<string>;
  notifiableEvent: NotifiableEventOnAidRequest;
  notificationMethod: NotificationMethod;
  notificationSettings: AidRequestNotificationSettingsType;
};

export default async function getCurrentSettingForNotificationOnAidRequest({
  extraRecipientIDs,
  notifiableEvent,
  notificationMethod,
  notificationSettings,
}: Args): Promise<AidRequestNotificationCurrentSettingForGraphQL> {
  const title = AidRequestNotificationsConfig[notifiableEvent].settingsTitle;
  const onlyIfSubscribedToRequest =
    !AidRequestNotificationsConfig[notifiableEvent].notificationMethods[
      notificationMethod
    ].isRegardlessOfSubscription;
  const user = await UserModel.findById(notificationSettings.userID);
  if (user == null) {
    return doNotNotify('User is null');
    return error();
  }
  const aidRequest = await maybeLoadAidRequestForViewer(
    user,
    notificationSettings.aidRequestID.toString(),
  );
  if (aidRequest == null) {
    return doNotNotify('Aid request is null');
    return error();
  }

  return await getCurrentSettingForNotificationOnAidRequestImpl(
    notifiableEvent,
    notificationMethod,
    notificationSettings,
    user,
    aidRequest,
    extraRecipientIDs,
    onlyIfSubscribedToRequest,
    title,
  );

  function error(): AidRequestNotificationCurrentSettingForGraphQL {
    return doNotNotify('There was a problem loading the notification settings');
  }

  function doNotNotify(
    reason: string,
  ): AidRequestNotificationCurrentSettingForGraphQL {
    return {
      notifiableEvent,
      notificationMethod,
      onlyIfSubscribedToRequest,
      reason,
      subscribeOrUnsubscribe: 'Unsubscribe',
      title,
    };
  }
}

type Status = {
  isSubscribed: boolean;
  reason: string;
};

async function getCurrentSettingForNotificationOnAidRequestImpl(
  notifiableEvent: NotifiableEventOnAidRequest,
  notificationMethod: NotificationMethod,
  notificationSettings: AidRequestNotificationSettingsType,
  user: Express.User,
  aidRequest: MongodbAidRequest,
  extraRecipientIDs: undefined | Array<string>,
  onlyIfSubscribedToRequest: boolean,
  title: string,
): Promise<AidRequestNotificationCurrentSettingForGraphQL> {
  let requestStatus: Status = getInitialRequestStatus(extraRecipientIDs);
  let eventStatus: Status = getInitialEventStatus();

  const relevantHistoryEvents = notificationSettings.history
    .filter(
      ({
        notifiableEvent: historyNotifiableEvent,
        notificationMethod: historyNotificationMethod,
      }: ChangeNotificationSettingEvent): boolean => {
        return (
          (notifiableEvent === historyNotifiableEvent ||
            historyNotifiableEvent === 'Any') &&
          notificationMethod === historyNotificationMethod
        );
      },
    )
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  // Replay history so we get the most up-to-date setting
  relevantHistoryEvents.forEach(
    ({
      notifiableEvent: historyNotifiableEvent,
      subscribeOrUnsubscribe,
      timestamp,
    }: ChangeNotificationSettingEvent): void => {
      const isSubscribed: boolean = subscribeOrUnsubscribe === 'Subscribe';
      if (historyNotifiableEvent === 'Any') {
        requestStatus = {
          isSubscribed,
          reason: getRequestStatusReason(
            isSubscribed,
            `you changed this setting ${ago(timestamp)}`,
          ),
        };
      } else {
        eventStatus = {
          isSubscribed,
          reason: getEventStatusReason(
            isSubscribed,
            `you changed this setting ${ago(timestamp)}`,
            { isDefault: false },
            { isRegardlessOfSubscription: false },
            { qualifier: undefined },
          ),
        };
      }
    },
  );

  if (
    (!requestStatus.isSubscribed && onlyIfSubscribedToRequest) ||
    notifiableEvent === 'Any'
  ) {
    return createResult(requestStatus.isSubscribed, requestStatus.reason);
  } else {
    return createResult(eventStatus.isSubscribed, eventStatus.reason);
  }

  function getInitialRequestStatus(
    extraRecipientIDs: Array<string> | undefined,
  ): {
    isSubscribed: boolean;
    reason: string;
  } {
    if ((extraRecipientIDs ?? []).includes(user._id.toString())) {
      return {
        isSubscribed: true,
        reason: getRequestStatusReason(true, 'you were tagged in a comment'),
      };
    }
    const history = getHistoryWithoutRemovals(aidRequest);
    const actions = history.filter(
      ({ actor }) => actor.toString() === user._id.toString(),
    );
    const isSubscribed: boolean = actions.length > 0;
    if (!isSubscribed) {
      return {
        isSubscribed,
        reason: getRequestStatusReason(
          isSubscribed,
          'this is the default setting',
        ),
      };
    }

    const mainReasonEvent = actions.reduce((a, b) => {
      return PRIORITY_HISTORY_EVENTS.indexOf(b.event) <
        PRIORITY_HISTORY_EVENTS.indexOf(a.event)
        ? b
        : a;
    }, actions[0]);
    return {
      isSubscribed: true,
      reason: getRequestStatusReason(
        true,
        `you ${getStatusText(mainReasonEvent.event)} it`,
      ),
    };
  }

  function getInitialEventStatus(): {
    isSubscribed: boolean;
    reason: string;
  } {
    const { isRegardlessOfSubscription, subscribeOrUnsubscribe } =
      getDefaultNotificationSetting({
        notifiableEvent,
        notificationMethod,
      });
    let isSubscribed = subscribeOrUnsubscribe === 'Subscribe';
    // You're subscribed to reminders <about requests you're working on> because
    // this is the default setting
    let qualifier: string | undefined;
    if (notifiableEvent === 'Reminder') {
      qualifier = "about requests you're working on";
      // Only remind people of aid requests that they're working on
      // and that are open.
      if (
        !aidRequest.whoIsWorkingOnIt.some((idObj: ObjectId): boolean =>
          user._id.equals(idObj),
        ) ||
        aidRequest.completed
      ) {
        qualifier = "about requests you're not working on";
        isSubscribed = false;
      }
    }
    return {
      isSubscribed,
      reason: getEventStatusReason(
        isSubscribed,
        'this is the default setting',
        { isDefault: true },
        { isRegardlessOfSubscription },
        { qualifier },
      ),
    };
  }

  function getRequestStatusReason(isSubscribed: boolean, why: string): string {
    return `You are ${
      isSubscribed ? '' : 'not '
    }subscribed to updates on this request because ${why}`;
  }

  function getEventStatusReason(
    isSubscribed: boolean,
    why: string,
    { isDefault }: { isDefault: boolean },
    { isRegardlessOfSubscription }: { isRegardlessOfSubscription: boolean },
    { qualifier }: { qualifier: string | undefined },
  ): string {
    const contextString = getContextString({
      config: AidRequestNotificationsConfig[notifiableEvent],
      isDefault,
      isRegardlessOfSubscription,
      qualifier,
    });

    return `You are ${isSubscribed ? '' : 'not '}subscribed to ${
      AidRequestNotificationsConfig[notifiableEvent].shortNoun
    }${contextString}because ${why}`;
  }

  function createResult(
    isSubscribed: boolean,
    reason: string,
  ): AidRequestNotificationCurrentSettingForGraphQL {
    return {
      notifiableEvent,
      notificationMethod,
      onlyIfSubscribedToRequest,
      reason,
      subscribeOrUnsubscribe: isSubscribed ? 'Subscribe' : 'Unsubscribe',
      title,
    };
  }
}

function getStatusText(event: AidRequestHistoryEventType): string {
  // You are subscribed to this event because you ____ it
  switch (event) {
    case 'WorkingOn':
      return 'are working on';
    case 'Completed':
      return 'completed';
    case 'Created':
      return 'created';
    case 'Deleted':
      return 'deleted';
    case 'Comment':
      return 'commented on';
    case 'ChangedWhatIsNeeded':
    case 'ChangedWhoIsItFor':
      return 'edited';
  }
}

function getContextString({
  config,
  isDefault,
  isRegardlessOfSubscription,
  qualifier,
}: {
  config: EventConfig;
  isDefault: boolean;
  isRegardlessOfSubscription: boolean;
  qualifier: string | undefined;
}): string {
  if (qualifier) {
    return ` ${qualifier} `;
  }
  if (config.omitContextString) {
    return ' ';
  }
  return ` on ${
    !isDefault
      ? 'this request'
      : isRegardlessOfSubscription
      ? 'all requests'
      : "requests you're subscribed to"
  } `;
}
