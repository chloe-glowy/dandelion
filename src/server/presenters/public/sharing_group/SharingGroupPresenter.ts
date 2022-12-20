import { CC } from 'src/server/context_container/public/ContextContainer';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';

export class SharingGroupPresenter {
  public static async load(
    cc: CC,
    id: string,
  ): Promise<SharingGroupPresenter | null> {
    const sharingGroup = await SharingGroup.load(cc, id);
    return sharingGroup == null
      ? null
      : new SharingGroupPresenter(cc, sharingGroup);
  }

  constructor(
    private readonly cc: CC,
    private readonly sharingGroup: SharingGroup,
  ) {}

  public async getID(): Promise<string> {
    return await this.sharingGroup.getID();
  }

  public async getDisplayName(): Promise<string> {
    return await this.sharingGroup.getDisplayName();
  }
}
