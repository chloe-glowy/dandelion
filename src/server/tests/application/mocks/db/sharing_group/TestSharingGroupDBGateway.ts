import { CC } from 'src/server/context_container/public/ContextContainer';
import { UnableToLoadEntityError } from 'src/server/entities/public/errors/UnableToLoadEntityError';
import { SharingGroupCreateArgs } from 'src/server/entities/public/sharing_group/mutations/SharingGroupCreate';
import { SharingGroupDBGatewayType } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBGatewayType';
import { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';
import { TestSharingGroupDBProxy } from 'src/server/tests/application/mocks/db/sharing_group/TestSharingGroupDBProxy';
import { TestSharingGroupInMemoryDatabase } from 'src/server/tests/application/mocks/db/sharing_group/TestSharingGroupInMemoryDatabase';
import { TestSharingGroupInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/sharing_group/TestSharingGroupInMemoryDatabaseRow';
import { TestUserInMemoryDatabase } from 'src/server/tests/application/mocks/db/user/TestUserInMemoryDatabase';
import { TestID } from 'src/server/tests/application/mocks/TestID';

export class TestSharingGroupDBGateway implements SharingGroupDBGatewayType {
  async load(cc: CC, id: string): Promise<SharingGroupDBProxy> {
    const testSharingGroupInMemoryDatabaseRow =
      TestSharingGroupInMemoryDatabase.get(id);
    if (testSharingGroupInMemoryDatabaseRow == null) {
      throw new UnableToLoadEntityError('SharingGroup', id);
    }
    return new TestSharingGroupDBProxy(cc, testSharingGroupInMemoryDatabaseRow);
  }

  async createAndAddCreatorAsSoleMember(
    cc: CC,
    args: SharingGroupCreateArgs,
    creator: User,
  ): Promise<SharingGroup> {
    const sharingGroupID = TestID.create('sharing_group');
    const row = new TestSharingGroupInMemoryDatabaseRow({
      displayName: args.displayName,
      id: sharingGroupID,
    });
    TestSharingGroupInMemoryDatabase.set(sharingGroupID, row);

    // Add the creator as a member of the sharing group
    const creatorUserID = await creator.getID();
    const userRow = TestUserInMemoryDatabase.get(creatorUserID);
    if (userRow == null) {
      throw new Error('Failed to find user');
    }
    userRow.properties.sharingGroupIDs =
      userRow.properties.sharingGroupIDs.concat(sharingGroupID);

    const sharingGroup = await SharingGroup.load(cc, sharingGroupID);
    if (sharingGroup == null) {
      throw new Error('Failed to create sharing group');
    }
    return sharingGroup;
  }
}
