import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import getWhoRecordedRequest from 'src/server/adapters/mongodb/collections/aid_request/helpers/getWhoRecordedRequest';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import loadAidRequestForViewer from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

const whoRecordedIt: ObjectTypeComposerFieldConfigAsObjectDefinition<
  MongodbAidRequest,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: aidRequestID }: MongodbAidRequest,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<Express.User | null> => {
    const user = assertLoggedIn(req, 'AidRequest.whoRecordedIt');
    const aidRequest = await loadAidRequestForViewer(user, aidRequestID);
    return await getWhoRecordedRequest(aidRequest);
  },
  type: 'User',
};

export default whoRecordedIt;
