import type { CurrentUserPayload } from 'src/server/adapters/mongodb/collections/user/UserGraphQLTypes';
import { CurrentUserGraphQLType } from 'src/server/adapters/mongodb/collections/user/UserGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import analytics from 'src/server/deprecated/analytics';

function logoutResolver(
  _: unknown,
  _args: Record<string, never>,
  req: Express.Request,
): CurrentUserPayload {
  const user = req.user;
  if (user != null) {
    analytics.track({
      event: 'Logged Out',
      user,
    });
  }
  req.logout();
  return { user: undefined };
}

const logout = {
  resolve: logoutResolver,
  type: CurrentUserGraphQLType,
};

export default logout;
