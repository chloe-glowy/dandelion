import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { UserDBProxy } from 'src/server/entities/public/user/plugins/interfaces/UserDBProxy';
import { User } from 'src/server/entities/public/user/User';

export class MongodbUserDBProxy implements UserDBProxy {
  constructor(private readonly mongodbUser: Express.User) {}

  public async getID(): Promise<string> {
    return this.mongodbUser._id.toString();
  }

  public async getDisplayName(): Promise<string> {
    return this.mongodbUser.displayName;
  }

  public async getSharingGroupIDs(): Promise<ReadonlyArray<string>> {
    return this.mongodbUser.sharingGroups.map((oid) => oid.toString());
  }

  public async getIsMemberOfSharingGroupID(
    sharingGroupID: string,
  ): Promise<boolean> {
    const sharingGroupIDs = await this.getSharingGroupIDs();
    return sharingGroupIDs.includes(sharingGroupID);
  }

  public async getIsMemberOfSharingGroup(
    sharingGroup: SharingGroup,
  ): Promise<boolean> {
    const [sharingGroupID, sharingGroupIDs] = await Promise.all([
      sharingGroup.getID(),
      this.getSharingGroupIDs(),
    ]);
    return sharingGroupIDs.includes(sharingGroupID);
  }

  public async getIsInMultipleSharingGroups(): Promise<boolean> {
    return this.mongodbUser.sharingGroups.length > 1;
  }

  public async isSameUser(other: User): Promise<boolean> {
    const otherID = await other.getID();
    const thisID = await this.getID();
    return otherID === thisID;
  }
}
