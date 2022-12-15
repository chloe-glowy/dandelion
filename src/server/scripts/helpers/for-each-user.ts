import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
import { initScriptEnvironment } from 'src/server/scripts/helpers/initScriptEnvironment';
import {
  getScriptOptions,
  ScriptOptionsType,
} from 'src/server/scripts/helpers/scriptOptions';

initScriptEnvironment();

type Handler = (
  user: Express.User,
  options: ScriptOptionsType,
) => Promise<void>;

export default async function forEachUser(handler: Handler): Promise<number> {
  const users = await UserModel.find();
  const options = getScriptOptions();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    await handler(user, options);
  }
  return 0;
}
