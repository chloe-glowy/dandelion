// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import { ObjectId } from 'mongodb';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { MongodbSharingGroup } from 'src/server/adapters/graphql/sharing_group_old/SharingGroupGraphQLTypes';
import { maybeLoadSharingGroupForViewer } from 'src/server/adapters/mongodb/collections/sharing_group/helpers/loadSharingGroupForUser';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';
import filterNulls from 'src/shared/language_utils/filterNulls';

const sharingGroups: ObjectTypeComposerFieldConfigAsObjectDefinition<
  Express.User,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: userID }: Express.User,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<Array<MongodbSharingGroup>> => {
    const viewer = assertLoggedIn(req, 'sharingGroups');
    const user = await UserModel.findById(userID);
    if (user == null) {
      return [];
    }
    if (!viewer._id.equals(user._id)) {
      throw new Error("You cannot load another user's sharingGroups");
    }
    const sharingGroups = await Promise.all(
      (user.sharingGroups ?? []).map(async (sharingGroupID: ObjectId) => {
        return await maybeLoadSharingGroupForViewer(viewer, sharingGroupID);
      }),
    );
    return filterNulls(sharingGroups);
  },
  type: '[SharingGroup!]!',
};

export default sharingGroups;
