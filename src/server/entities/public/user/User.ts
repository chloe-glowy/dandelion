import { CC } from 'src/server/context_container/public/ContextContainer';
import { UserCreateImpl } from 'src/server/entities/private/user/mutations/create/UserCreateImpl';
import { UserLoader } from 'src/server/entities/private/user/UserLoader';
import { VC } from 'src/server/entities/private/vc/ViewerContext';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { AuthenticatedUserID } from 'src/server/entities/public/user/AuthenticatedUserID';
import { UserCreateArgs } from 'src/server/entities/public/user/mutations/UserCreate';
import { UserDBProxy } from 'src/server/entities/public/user/plugins/interfaces/UserDBProxy';

export class User {
  public static async load(cc: CC, id: string): Promise<User | null> {
    return await UserLoader.load(cc, id, (dbProxy) => new this(cc, dbProxy));
  }

  public static async loadViewer(
    cc: CC,
    authenticatedUserID: AuthenticatedUserID,
  ): Promise<User | null> {
    return await UserLoader.loadViewer(
      cc,
      authenticatedUserID,
      (dbProxy) => new this(cc, dbProxy),
    );
  }

  public static async create(cc: CC, args: UserCreateArgs): Promise<User> {
    return await UserCreateImpl.create(cc, args);
  }

  private constructor(
    public readonly cc: CC,
    private readonly dbProxy: UserDBProxy,
  ) {}

  public async getID(): Promise<string> {
    return await this.dbProxy.getID();
  }

  public async getDisplayName(): Promise<string> {
    return await this.dbProxy.getDisplayName();
  }

  public async getSharingGroupIDs(): Promise<ReadonlyArray<string>> {
    return await this.dbProxy.getSharingGroupIDs();
  }

  public async getIsMemberOfSharingGroupID(
    sharingGroupID: string,
  ): Promise<boolean> {
    return await this.dbProxy.getIsMemberOfSharingGroupID(sharingGroupID);
  }

  public async getIsMemberOfSharingGroup(
    sharingGroup: SharingGroup,
  ): Promise<boolean> {
    return await this.dbProxy.getIsMemberOfSharingGroup(sharingGroup);
  }

  public async isSameUser(other: User): Promise<boolean> {
    return await this.dbProxy.isSameUser(other);
  }

  public async getIsViewer(): Promise<boolean> {
    const vc = this.cc.get(VC).vc;
    return await vc.isSameUser(this);
  }

  public async getIsInMultipleSharingGroups(): Promise<boolean> {
    return await this.dbProxy.getIsInMultipleSharingGroups();
  }
}
