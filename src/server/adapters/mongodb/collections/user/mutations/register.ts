import mongoose from 'mongoose';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import passport from 'passport';
import type { CurrentUserPayload } from 'src/server/adapters/mongodb/collections/user/UserGraphQLTypes';
import { CurrentUserGraphQLType } from 'src/server/adapters/mongodb/collections/user/UserGraphQLTypes';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import analytics from 'src/server/deprecated/analytics';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import getEmailAddress from 'src/shared/to_clean/urls/getEmailAddress';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import matchStringCaseInsensitive from 'src/shared/to_clean/utils/regexp/matchStringCaseInsensitive';

async function registerResolver(
  _: unknown,
  { username: username_, password }: { username: string; password: string },
  req: Express.Request,
): Promise<CurrentUserPayload> {
  const username = username_.toLowerCase();
  const allowlistEntry = await mongoose.connection.db
    .collection('email-allowlist')
    .findOne({ email: matchStringCaseInsensitive(username) });
  if (allowlistEntry == null) {
    analytics.track({
      event: 'no allowlist entry',
      properties: {
        email: username,
      },
      user: null,
    });
    throw new Error(
      `To protect the privacy of our users' data, you cannot create an account without first being added to the list of allowed users. Please email ${getEmailAddress(
        { emailUser: 'new.user' },
      )} if you'd like to be added!`,
    );
  }

  // Passport expects these to be in the request body, not in
  // the GraphQL argument payload.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req as any).body.username = username;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req as any).body.password = password;
  return new Promise((resolve, reject) => {
    passport.authenticate('local', async (err, user, _info) => {
      if (err) {
        return reject(err);
      }

      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await UserModel.register(
        {
          displayName: allowlistEntry.displayName,
          username,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        password,
      );
      analytics.identify({
        traits: { username },
        userId: newUser._id.toString(),
      });
      analytics.track({
        event: 'Create Account',
        user: newUser,
      });
      req.logIn(newUser, function (err) {
        if (err) {
          return reject(err);
        }
        return resolve({
          user: newUser,
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })(req, (req as any).response, (req as any).next);
  });
}

const register = {
  args: {
    password: 'String!',
    username: 'String!',
  },
  resolve: registerResolver,
  type: CurrentUserGraphQLType,
};

export default register;
