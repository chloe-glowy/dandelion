import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import type { MongodbSharingGroup } from 'src/server/adapters/graphql/sharing_group_old/SharingGroupGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { loadSharingGroupForViewer } from 'src/server/adapters/mongodb/collections/sharing_group/helpers/loadSharingGroupForUser';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

type ReturnType = string;
const GraphQLType = 'String!';

export const _id: ObjectTypeComposerFieldConfigAsObjectDefinition<
  MongodbSharingGroup,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: sharingGroupID }: MongodbSharingGroup,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<ReturnType> => {
    const user = assertLoggedIn(req, 'SharingGroup._id');
    const sharingGroup = await loadSharingGroupForViewer(user, sharingGroupID);
    return sharingGroup._id.toString();
  },
  type: GraphQLType,
};
