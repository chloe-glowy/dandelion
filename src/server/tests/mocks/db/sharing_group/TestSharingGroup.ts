import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { TestSharingGroupInMemoryDatabase } from 'src/server/tests/mocks/db/sharing_group/TestSharingGroupInMemoryDatabase';
import { TestSharingGroupInMemoryDatabaseRow } from 'src/server/tests/mocks/db/sharing_group/TestSharingGroupInMemoryDatabaseRow';
import { TestUser } from 'src/server/tests/mocks/db/user/TestUser';
import { TestID } from 'src/server/tests/mocks/TestID';

type CreateArgs = Readonly<{
  displayName: string;
}>;

export abstract class TestSharingGroup {
  /**
   * @deprecated Eventually this should be done via a real controller
   */
  public static async create(cc: CC, args: CreateArgs): Promise<SharingGroup> {
    const id = TestID.create('sharing_group');
    const row = new TestSharingGroupInMemoryDatabaseRow({
      displayName: args.displayName,
      id,
    });
    TestSharingGroupInMemoryDatabase.set(id, row);

    // Add the creator as a member of the sharing group
    const creator = Viewer.getUser(cc);
    if (creator == null) {
      throw new Error('Viewer must be set in order to create a SharingGroup');
    }
    await TestUser.addSharingGroupID(cc, creator, id);

    const sharingGroup = await SharingGroup.load(cc, id);
    if (sharingGroup == null) {
      throw new Error('Failed to create sharing group');
    }
    return sharingGroup;
  }
}
