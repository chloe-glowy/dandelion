import { throwFakeErrorSometimes } from 'src/server/adapters/error_logger/throwError';

/**
 * @deprecated use src/server/adapters/express/assertLoggedIn.ts instead
 */
export default function assertLoggedIn(
  req: Express.Request,
  action: string,
  // suppression: { suppressFakeErrors: boolean } = { suppressFakeErrors: false },
): Express.User {
  const { user } = req;
  if (user == null) {
    throw new Error('You must be logged in for action: ' + action);
  }
  throwFakeErrorSometimes({
    displayText: 'Authentication failed',
    file: 'src/server/graphql/assertLoggedIn.ts',
    probability: 0.1,
    properties: {
      userID: user._id.toString(),
    },
    suppression: {
      suppressFakeErrors: ![
        'AidRequest.actionsAvailable',
        'AidRequest._id',
      ].includes(action),
    },
  });
  return user;
}
