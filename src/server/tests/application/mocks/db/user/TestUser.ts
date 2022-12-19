import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import { AuthenticatedUserID } from 'src/server/entities/public/user/AuthenticatedUserID';
import { User } from 'src/server/entities/public/user/User';
import { ViewerPublic } from 'src/server/entities/public/viewer/ViewerPublic';
import { TestUserInMemoryDatabase } from 'src/server/tests/application/mocks/db/user/TestUserInMemoryDatabase';
import { TestUserInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/user/TestUserInMemoryDatabaseRow';
import { TestID } from 'src/server/tests/application/mocks/TestID';

type Properties = Readonly<{
  displayName: string;
  sharingGroupIDs: ReadonlyArray<string>;
}>;

export abstract class TestUser {
  public static async createViewer(
    cc: CC,
    properties: Properties,
  ): Promise<User> {
    const id = TestID.create('user');

    // Consider the user to be "authenticated" because we called createViewer,
    // so for the test case we're asserting that this user is the viewer,
    // which is authenticated.
    const authenticatedID = new TestAuthenticatedUserID(id);

    /**
     * For now, we will create the row directly and insert it into the in-memory
     * database. However, in the future, we should use the real APIs to create
     * test data.
     */
    const row = new TestUserInMemoryDatabaseRow({ id, ...properties });
    TestUserInMemoryDatabase.set(id, row);

    await ViewerPublic.initializeViewerContext(cc, authenticatedID);
    const viewer = Viewer.getUser(cc);
    if (viewer == null) {
      throw new Error('Failed to create viewer');
    }
    return viewer;
  }

  /**
   * @deprecated Eventually this should be done via a real controller
   */
  public static async addSharingGroupID(
    cc: CC,
    user: User,
    sharingGroupID: string,
  ): Promise<void> {
    const userID = await user.getID();
    const userRow = TestUserInMemoryDatabase.get(userID);
    if (userRow == null) {
      throw new Error('Failed to find user');
    }
    userRow.properties.sharingGroupIDs =
      userRow.properties.sharingGroupIDs.concat(sharingGroupID);
  }
}

class TestAuthenticatedUserID implements AuthenticatedUserID {
  public constructor(public readonly id: string | null) {}
}
