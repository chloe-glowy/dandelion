// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import { ObjectId } from 'mongodb';
import { UserGraphQLType } from 'src/server/adapters/mongodb/collections/user/UserGraphQLTypes';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

UserGraphQLType;

const taggableUsers: ObjectTypeComposerFieldConfigAsObjectDefinition<
  Express.User,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: userID }: Express.User,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<Array<Express.User>> => {
    const viewer = assertLoggedIn(req, 'taggableUsers');
    const user = await UserModel.findById(userID);
    if (user == null) {
      return [];
    }
    if (!viewer._id.equals(user._id)) {
      throw new Error("You cannot load another user's taggable users");
    }
    const usersPerSharingGroup = await Promise.all(
      user.sharingGroups.map(
        async (sharingGroup: ObjectId): Promise<Array<Express.User>> => {
          return await UserModel.find({ sharingGroups: sharingGroup });
        },
      ),
    );
    const users = usersPerSharingGroup.reduce(
      (agg: Array<Express.User>, list: Array<Express.User>) => {
        list.forEach((user: Express.User): void => {
          if (
            agg.every(
              (other: Express.User): boolean => !user._id.equals(other._id),
            )
          ) {
            agg.push(user);
          }
        });
        return agg;
      },
      [],
    );
    return users;
  },
  type: '[User!]!',
};

export default taggableUsers;
