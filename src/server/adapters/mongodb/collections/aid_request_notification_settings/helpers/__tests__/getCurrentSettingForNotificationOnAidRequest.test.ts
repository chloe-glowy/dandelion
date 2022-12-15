import { ObjectId } from 'mongodb';
import getCurrentSettingForNotificationOnAidRequest from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/helpers/getCurrentSettingForNotificationOnAidRequest';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import createTestAidRequest from 'src/server/to_clean/testing/createTestAidRequest';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import createTestUser from 'src/server/to_clean/testing/createTestUser';

describe('getCurrentSettingForNotificationOnAidRequest', () => {
  const userA = createTestUser();
  const aidRequestA = createTestAidRequest({
    whoRecordedIt: userA._id,
  });

  it('Should subscribe the creator by default', async () => {
    const setting = await getCurrentSettingForNotificationOnAidRequest({
      notifiableEvent: 'NewComment',
      notificationMethod: 'Email',
      notificationSettings: {
        _id: 'notificationSettingsID_a',
        aidRequestID: new ObjectId(aidRequestA._id),
        history: [],
        userID: userA._id,
      },
    });
    expect(setting).toMatchObject({
      reason:
        "You are subscribed to new comments on requests you're subscribed to because this is the default setting",
      subscribeOrUnsubscribe: 'Subscribe',
    });
  });

  it('Should explain why the user is subscribed to the aid request if notifiableEvent=Any', async () => {
    const setting = await getCurrentSettingForNotificationOnAidRequest({
      notifiableEvent: 'Any',
      notificationMethod: 'Email',
      notificationSettings: {
        _id: 'notificationSettingsID_a',
        aidRequestID: new ObjectId(aidRequestA._id),
        history: [],
        userID: userA._id,
      },
    });
    expect(setting).toMatchObject({
      reason:
        'You are subscribed to updates on this request because you created it',
      subscribeOrUnsubscribe: 'Subscribe',
    });
  });

  it('If the user unsubscribes from the request, they should no longer be subscribed to new comment notifications', async () => {
    const setting = await getCurrentSettingForNotificationOnAidRequest({
      notifiableEvent: 'NewComment',
      notificationMethod: 'Email',
      notificationSettings: {
        _id: 'notificationSettingsID_a',
        aidRequestID: new ObjectId(aidRequestA._id),
        history: [
          {
            notifiableEvent: 'Any',
            notificationMethod: 'Email',
            subscribeOrUnsubscribe: 'Unsubscribe',
            timestamp: new Date(),
          },
        ],
        userID: userA._id,
      },
    });
    expect(setting).toMatchObject({
      reason:
        'You are not subscribed to updates on this request because you changed this setting just now',
      subscribeOrUnsubscribe: 'Unsubscribe',
    });
  });

  it('If the user unsubscribes from the request, they should no longer be subscribed to the overall aid request', async () => {
    const setting = await getCurrentSettingForNotificationOnAidRequest({
      notifiableEvent: 'Any',
      notificationMethod: 'Email',
      notificationSettings: {
        _id: 'notificationSettingsID_a',
        aidRequestID: new ObjectId(aidRequestA._id),
        history: [
          {
            notifiableEvent: 'Any',
            notificationMethod: 'Email',
            subscribeOrUnsubscribe: 'Unsubscribe',
            timestamp: new Date(),
          },
        ],
        userID: userA._id,
      },
    });
    expect(setting).toMatchObject({
      reason:
        'You are not subscribed to updates on this request because you changed this setting just now',
      subscribeOrUnsubscribe: 'Unsubscribe',
    });
  });
});
