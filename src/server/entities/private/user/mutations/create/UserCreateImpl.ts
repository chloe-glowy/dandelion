import { CC } from 'src/server/context_container/public/ContextContainer';
import { UserCreatePermissionPolicy } from 'src/server/entities/private/user/mutations/create/permission/UserCreatePermissionPolicy';
import { UserCreateArgs } from 'src/server/entities/public/user/mutations/UserCreate';
import { UserDBGatewayPlugin } from 'src/server/entities/public/user/plugins/UserDBGatewayPlugin';
import { User } from 'src/server/entities/public/user/User';

export class UserCreateImpl {
  public static async create(cc: CC, args: UserCreateArgs): Promise<User> {
    const hasPermission = await UserCreatePermissionPolicy.isAllowed(cc, args);
    if (!hasPermission) {
      throw new Error('You do not have permission to create a user');
    }
    return await UserDBGatewayPlugin.getImpl(cc).create(cc, args);
  }
}
