// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { schemaComposer } from 'graphql-compose';
import { AidRequestNotificationSettingsTypeForGraphQL } from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/AidRequestNotificationSettingsModelTypes';
import getAidRequestNotificationSettings from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/helpers/getAidRequestNotificationSettings';
import graphqlifyAidRequestNotificationSettings from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/helpers/graphqlifyAidRequestNotificationSettings';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import analytics from 'src/server/deprecated/analytics';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

type Args = {
  aidRequestID: string;
};

const aidRequests = schemaComposer.createResolver<Express.User, Args>({
  args: {
    aidRequestID: 'String!',
  },
  kind: 'query',
  name: 'aidRequestNotificationSettings',
  resolve: async ({
    args,
    context: request,
  }): Promise<AidRequestNotificationSettingsTypeForGraphQL> => {
    const { aidRequestID } = args;
    const user = assertLoggedIn(request, 'aidRequest');
    const notificationSettings = await getAidRequestNotificationSettings(
      user,
      aidRequestID,
    );

    analytics.track({
      event: 'Loaded Aid Request Notification Settings',
      properties: {
        aidRequestID,
      },
      user,
    });

    return graphqlifyAidRequestNotificationSettings(user, notificationSettings);
  },
  type: 'AidRequestNotificationSettings!',
});

export default aidRequests;
