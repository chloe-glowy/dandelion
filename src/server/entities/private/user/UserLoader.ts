import { CC } from 'src/server/context_container/public/ContextContainer';
import { AuthenticatedUserID } from 'src/server/entities/public/user/AuthenticatedUserID';
import { UserDBProxy } from 'src/server/entities/public/user/plugins/interfaces/UserDBProxy';
import { UserDBGatewayPlugin } from 'src/server/entities/public/user/plugins/UserDBGatewayPlugin';
import { User } from 'src/server/entities/public/user/User';
import { UserPrivacyPolicy } from 'src/server/entities/public/user/UserPrivacyPolicy';

type UserConstructor = (dbProxy: UserDBProxy) => User;

export abstract class UserLoader {
  public static async load(
    cc: CC,
    id: string,
    userConstructor: UserConstructor,
  ): Promise<User | null> {
    const user = await UserLoader.loadWithoutPrivacyCheck(
      cc,
      id,
      userConstructor,
    );
    if (user == null) {
      return null;
    }
    const canSee = await UserPrivacyPolicy.canSee(cc, user);
    return canSee ? user : null;
  }

  public static async loadViewer(
    cc: CC,
    authenticatedUserID: AuthenticatedUserID,
    userConstructor: UserConstructor,
  ): Promise<User | null> {
    return await UserLoader.loadWithoutPrivacyCheck(
      cc,
      authenticatedUserID.id,
      userConstructor,
    );
  }

  private static async loadWithoutPrivacyCheck(
    cc: CC,
    id: string | null,
    userConstructor: UserConstructor,
  ): Promise<User | null> {
    if (id == null) {
      return null;
    }
    const dbProxy = await cc.memoize(
      UserLoader,
      id ?? 'null',
      async () => await cc.getPlugin(UserDBGatewayPlugin).load(id),
    );
    if (dbProxy == null) {
      return null;
    }
    return userConstructor(dbProxy);
  }
}
