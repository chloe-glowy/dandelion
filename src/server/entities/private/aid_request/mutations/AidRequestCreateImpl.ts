import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestCreatePermissionPolicy } from 'src/server/entities/private/aid_request/mutations/AidRequestCreatePermissionPolicy';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestCreateArgs } from 'src/server/entities/public/aid_request/mutations/AidRequestCreate';
import { AidRequestDBGatewayPlugin } from 'src/server/entities/public/aid_request/plugins/AidRequestDBGatewayPlugin';

export class AidRequestCreateImpl {
  public static async create(
    cc: CC,
    args: AidRequestCreateArgs,
  ): Promise<AidRequest> {
    const hasPermission = await AidRequestCreatePermissionPolicy.isAllowed(
      cc,
      args,
    );
    if (!hasPermission) {
      throw new Error('You do not have permission to create an aid request');
    }
    return await cc.getPlugin(AidRequestDBGatewayPlugin).create(cc, args);
  }
}
