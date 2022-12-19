import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { UserDBProxy } from 'src/server/entities/public/user/plugins/interfaces/UserDBProxy';
import { User } from 'src/server/entities/public/user/User';
import { TestUserInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/user/TestUserInMemoryDatabaseRow';

export class TestUserDBProxy implements UserDBProxy {
  public constructor(private readonly row: TestUserInMemoryDatabaseRow) {}

  public async getID(): Promise<string> {
    return this.row.properties.id;
  }

  public async getDisplayName(): Promise<string> {
    return this.row.properties.displayName;
  }

  public async getSharingGroupIDs(): Promise<ReadonlyArray<string>> {
    return this.row.properties.sharingGroupIDs;
  }

  public async getIsMemberOfSharingGroupID(
    sharingGroupID: string,
  ): Promise<boolean> {
    return this.row.properties.sharingGroupIDs.includes(sharingGroupID);
  }

  public async getIsMemberOfSharingGroup(
    sharingGroup: SharingGroup,
  ): Promise<boolean> {
    const sharingGroupID = await sharingGroup.getID();
    return await this.getIsMemberOfSharingGroupID(sharingGroupID);
  }

  public async getIsInMultipleSharingGroups(): Promise<boolean> {
    return this.row.properties.sharingGroupIDs.length > 1;
  }

  public async isSameUser(other: User): Promise<boolean> {
    const otherID = await other.getID();
    const thisID = await this.getID();
    return otherID === thisID;
  }
}
