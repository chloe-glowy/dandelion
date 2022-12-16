import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { UserDBProxy } from 'src/server/entities/public/user/plugins/interfaces/UserDBProxy';
import { User } from 'src/server/entities/public/user/User';
import { TestUserInMemoryDatabaseRow } from 'src/server/tests/mocks/db/user/TestUserInMemoryDatabaseRow';

export class TestUserDBProxy implements UserDBProxy {
  public constructor(private readonly row: TestUserInMemoryDatabaseRow) {}

  public async getID(): Promise<string> {
    throw new Error('TestUserDBProxy.getID -- Not yet implemented');
  }

  public async getDisplayName(): Promise<string> {
    throw new Error('TestUserDBProxy.getDisplayName -- Not yet implemented');
  }

  public async getSharingGroupIDs(): Promise<ReadonlyArray<string>> {
    throw new Error(
      'TestUserDBProxy.getSharingGroupIDs -- Not yet implemented',
    );
  }

  public async getIsMemberOfSharingGroupID(
    _sharingGroupID: string,
  ): Promise<boolean> {
    throw new Error(
      'TestUserDBProxy.getIsMemberOfSharingGroupID -- Not yet implemented',
    );
  }

  public async getIsMemberOfSharingGroup(
    _sharingGroup: SharingGroup,
  ): Promise<boolean> {
    throw new Error(
      'TestUserDBProxy.getIsMemberOfSharingGroup -- Not yet implemented ',
    );
  }

  public async getIsInMultipleSharingGroups(): Promise<boolean> {
    throw new Error(
      'TestUserDBProxy.getIsInMultipleSharingGroups -- Not yet implemented',
    );
  }

  public async isSameUser(_other: User): Promise<boolean> {
    throw new Error('TestUserDBProxy.isSameUser -- Not yet implemented');
  }
}
