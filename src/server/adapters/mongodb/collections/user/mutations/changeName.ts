import { UserGraphQLType } from 'src/server/adapters/mongodb/collections/user/UserGraphQLTypes';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import assertLoggedIn from 'src/server/deprecated/assertLoggedIn';

async function changeNameResolver(
  _: unknown,
  { displayName }: { displayName: string },
  req: Express.Request,
): Promise<Express.User | null> {
  if (displayName.length === 0) {
    throw new Error('Name cannot be empty');
  }
  const viewer = assertLoggedIn(req, 'changeName');
  const updated = await UserModel.findByIdAndUpdate(
    viewer._id,
    { displayName },
    { updated: true },
  );
  return updated;
}

const changeName = {
  args: {
    displayName: 'String!',
  },
  resolve: changeNameResolver,
  type: UserGraphQLType,
};

export default changeName;
