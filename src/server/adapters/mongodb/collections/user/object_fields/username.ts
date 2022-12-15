// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

const username: ObjectTypeComposerFieldConfigAsObjectDefinition<
  Express.User,
  Express.Request,
  Record<string, never>
> = {
  resolve: async (
    { _id: userID }: Express.User,
    _args: Record<string, never>,
    req: Express.Request,
  ): Promise<string> => {
    const viewer = assertLoggedIn(req, 'username');
    const user = await UserModel.findById(userID);
    if (user == null) {
      throw new Error('User not found');
    }
    if (!viewer._id.equals(user._id)) {
      throw new Error("You cannot load another user's username");
    }
    return user.username;
  },
  type: 'String!',
};

export default username;
