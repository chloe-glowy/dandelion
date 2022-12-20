import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import { SharingGroupCreatePermissionPolicy } from 'src/server/entities/private/sharing_group/mutations/create/permission/SharingGroupCreatePermissionPolicy';
import { SharingGroupCreateArgs } from 'src/server/entities/public/sharing_group/mutations/SharingGroupCreate';
import { SharingGroupDBGatewayPlugin } from 'src/server/entities/public/sharing_group/plugins/SharingGroupDBLoader';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';

export class SharingGroupCreateImpl {
  public static async create(
    cc: CC,
    args: SharingGroupCreateArgs,
  ): Promise<SharingGroup> {
    const hasPermission = await SharingGroupCreatePermissionPolicy.isAllowed(
      cc,
      args,
    );
    if (!hasPermission) {
      throw new Error('You do not have permission to create an aid request');
    }
    const creator = Viewer.getUser(cc);
    if (creator == null) {
      throw new Error('You must be logged in to create a sharing group');
    }
    return await SharingGroupDBGatewayPlugin.get().createAndAddCreatorAsSoleMember(
      cc,
      args,
      creator,
    );
  }
}
