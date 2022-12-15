import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import loadAidRequestForViewer from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { maybeLoadMany } from 'src/server/adapters/mongodb/collections/user/loader/loadUserForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

const whoIsWorkingOnItUsers: ObjectTypeComposerFieldConfigAsObjectDefinition<
  MongodbAidRequest,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: aidRequestID }: MongodbAidRequest,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<Array<Express.User>> => {
    const viewer = assertLoggedIn(req, 'AidRequest.whoIsWorkingOnItUsers');
    const aidRequest = await loadAidRequestForViewer(viewer, aidRequestID);
    const { whoIsWorkingOnIt: whoIsWorkingOnItUserIDs } = aidRequest;
    return await maybeLoadMany(viewer, whoIsWorkingOnItUserIDs);
  },
  type: '[User]',
};

export default whoIsWorkingOnItUsers;
