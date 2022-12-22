import { CC } from 'src/server/context_container/public/ContextContainer';
import { SharingGroupCreateArgs } from 'src/server/entities/public/sharing_group/mutations/SharingGroupCreate';
import type { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';

export interface SharingGroupDBGatewayType {
  load(cc: CC, id: string): Promise<SharingGroupDBProxy>;
  createAndAddCreatorAsSoleMember(
    cc: CC,
    args: SharingGroupCreateArgs,
    creator: User,
  ): Promise<SharingGroup>;
}
