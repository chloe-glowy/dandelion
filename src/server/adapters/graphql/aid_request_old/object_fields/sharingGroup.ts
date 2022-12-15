import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import { MongodbSharingGroup } from 'src/server/adapters/graphql/sharing_group_old/SharingGroupGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import loadAidRequestForViewer from 'src/server/adapters/mongodb/collections/aid_request/helpers/loadAidRequestForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { loadSharingGroupForViewer } from 'src/server/adapters/mongodb/collections/sharing_group/helpers/loadSharingGroupForUser';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

type ReturnType = MongodbSharingGroup;
const GraphQLType = 'SharingGroup!';

const sharingGroup: ObjectTypeComposerFieldConfigAsObjectDefinition<
  MongodbAidRequest,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: aidRequestID }: MongodbAidRequest,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<ReturnType> => {
    const user = assertLoggedIn(req, 'AidRequest.sharingGroup');
    const aidRequest = await loadAidRequestForViewer(user, aidRequestID);
    const sharingGroup = await loadSharingGroupForViewer(
      user,
      aidRequest.sharingGroup,
    );
    return sharingGroup;
  },
  type: GraphQLType,
};

export default sharingGroup;
