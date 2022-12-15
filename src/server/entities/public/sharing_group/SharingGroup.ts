import { CC } from 'src/server/context_container/public/ContextContainer';
import { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';
import { SharingGroupDBGatewayPlugin } from 'src/server/entities/public/sharing_group/plugins/SharingGroupDBLoader';
import { SharingGroupPrivacyPolicy } from 'src/server/entities/public/sharing_group/policy/SharingGroupPrivacyPolicy';

export class SharingGroup {
  public static async load(cc: CC, id: string): Promise<SharingGroup | null> {
    const dbProxy = await SharingGroupDBGatewayPlugin.get().load(id);
    if (dbProxy == null) {
      return null;
    }
    const sharingGroup = new SharingGroup(cc, dbProxy);
    const canSee = await SharingGroupPrivacyPolicy.canSee(cc, sharingGroup);
    return canSee ? sharingGroup : null;
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
