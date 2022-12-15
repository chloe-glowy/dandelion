import {
  AidRequestGraphQLType,
  MongodbAidRequest,
} from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import loadAidRequestForViewer from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import analytics from 'src/server/deprecated/analytics';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

type Args = {
  aidRequestID: string;
};

const aidRequests = AidRequestGraphQLType.schemaComposer.createResolver<
  Express.User,
  Args
>({
  args: {
    aidRequestID: 'String!',
  },
  kind: 'query',
  name: 'aidRequest',
  resolve: async ({ args, context: request }): Promise<MongodbAidRequest> => {
    const user = assertLoggedIn(request, 'aidRequest');
    const { aidRequestID } = args;
    const aidRequest = await loadAidRequestForViewer(user, aidRequestID);

    analytics.track({
      event: 'Loaded Aid Request Details',
      properties: {
        aidRequestID,
      },
      user,
    });

    return aidRequest;
  },
  type: 'AidRequest!',
});

export default aidRequests;
