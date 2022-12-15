// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import MongoStore from 'connect-mongo';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import type { Express } from 'express';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import expressSession from 'express-session';
import { ObjectId } from 'mongodb';
import type {
  HydratedDocument,
  PassportLocalModel,
  // prettier expects a comma but "editor.codeActionsOnSave": { "source.organizeImports": true } removes the comma
  PassportLocalSchema,
} from 'mongoose';
import mongoose, { Document, Schema } from 'mongoose';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import passport from 'passport';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import passportLocalMongoose from 'passport-local-mongoose';
import { AidRequestReference } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MONGO_DB_URI } from 'src/server/adapters/mongodb/client';
import type { UserDocType } from 'src/server/adapters/mongodb/collections/user/UserModelTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import ENVIRONMENT_IS_USING_TEST_DATABASE from 'src/shared/to_clean/env/ENVIRONMENT_IS_USING_TEST_DATABASE';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import getEnvironmentVariableAndThrowIfNotFound from 'src/shared/to_clean/env/getEnvironmentVariableAndThrowIfNotFound';

export type UserType = Document<string, unknown, UserDocType> &
  UserDocType & { _id: ObjectId };

// Idk what's wrong here
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const UserSchema: PassportLocalSchema = new Schema<UserDocType>({
  aidRequestsIAmWorkingOn: [AidRequestReference],
  displayName: String,
  password: String,
  sharingGroups: [ObjectId],
  username: String,
});

UserSchema.plugin(passportLocalMongoose);
export const UserModel: PassportLocalModel<HydratedDocument<UserDocType>> =
  mongoose.model('userInfo', UserSchema, 'userInfo');

passport.use(UserModel.createStrategy());

// TODO #25: Remove `any` cast. These methods have the wrong type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser(UserModel.serializeUser() as any);
passport.deserializeUser(UserModel.deserializeUser());

const SESSION_SECRET =
  getEnvironmentVariableAndThrowIfNotFound('SESSION_SECRET');

const REQUIRE_SSL = !ENVIRONMENT_IS_USING_TEST_DATABASE;

export function initUserModels(app: Express): void {
  const store = MongoStore.create({
    mongoUrl: MONGO_DB_URI,
    ttl: 1000 * 365 * 24 * 60 * 60,
  });
  const sessionConfig = expressSession({
    cookie: {
      maxAge: 1000 * 3600 * 24 * 365 * 1000,
      secure: REQUIRE_SSL,
    },

    // forces the session to be saved back to the session store
    resave: false,
    // forces a session that is “uninitialized” to be saved to the store
    saveUninitialized: false,
    secret: SESSION_SECRET as string,
    store,
  });
  app.use(sessionConfig);
  app.use(passport.initialize());
  app.use(passport.session());
}
