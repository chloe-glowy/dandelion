import type { Document, Model, UpdateQuery } from 'mongoose';
import {
  UserModel,
  UserType,
} from 'src/server/adapters/mongodb/collections/user/UserModel';
import type { Options } from 'src/server/scripts/helpers/script-update-options';
import { updateObjectForScript } from 'src/server/scripts/helpers/update-object';

export async function updateUserForScript(
  user: Document<UserType>,
  updates: UpdateQuery<UserType>,
  { isDryRun, logOnChange }: Options,
): Promise<Document<UserType> | null> {
  return await updateObjectForScript<UserType>(user, updates, {
    isDryRun,
    logOnChange,
    model: UserModel as unknown as Model<UserType>,
    objectTypeName: 'User',
  });
}
