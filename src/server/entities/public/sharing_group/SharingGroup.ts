import { CC } from 'src/server/context_container/public/ContextContainer';
import { SharingGroupCreateImpl } from 'src/server/entities/private/sharing_group/mutations/create/SharingGroupCreateImpl';
import { SharingGroupCreateArgs } from 'src/server/entities/public/sharing_group/mutations/SharingGroupCreate';
import { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';
import { SharingGroupDBGatewayPlugin } from 'src/server/entities/public/sharing_group/plugins/SharingGroupDBLoader';
import { SharingGroupPrivacyPolicy } from 'src/server/entities/public/sharing_group/policy/SharingGroupPrivacyPolicy';

export class SharingGroup {
  public static async load(cc: CC, id: string): Promise<SharingGroup | null> {
    const dbProxy = await SharingGroupDBGatewayPlugin.get().load(cc, id);
    if (dbProxy == null) {
      return null;
    }
    const sharingGroup = new SharingGroup(cc, dbProxy);
    const canSee = await SharingGroupPrivacyPolicy.canSee(cc, sharingGroup);
    return canSee ? sharingGroup : null;
  }

  public static async create(
    cc: CC,
    args: SharingGroupCreateArgs,
  ): Promise<SharingGroup> {
    return await SharingGroupCreateImpl.create(cc, args);
  }

  private constructor(
    public readonly cc: CC,
    private readonly dbProxy: SharingGroupDBProxy,
  ) {}

  public async getID(): Promise<string> {
    return await this.dbProxy.getID();
  }

  public async getDisplayName(): Promise<string> {
    return await this.dbProxy.getDisplayName();
  }
}
