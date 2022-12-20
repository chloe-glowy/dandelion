import emailAddress from '@sendgrid/helpers/classes/email-address';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { CreateSharingGroupController } from 'src/server/controllers/sharing_group/create/CreateSharingGroupController';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import { SharingGroupPresenter } from 'src/server/presenters/public/sharing_group/SharingGroupPresenter';
import { UserPresenter } from 'src/server/presenters/public/user/UserPresenter';
import { TestCC } from 'src/server/tests/application/cc/TestCC';
import { initTestPlugins } from 'src/server/tests/application/mocks/plugins/initTestPlugins';

type CreateUserArgs = Readonly<{
  displayNameForUser: string;
  usersEmailAddress?: string;
  nameOfFirstSharingGroupForUser?: string;
}>;

type CallbackArgs = Readonly<{
  cc: CC;
  sharingGroupNameToID: (name: string) => string;
}>;

export abstract class TestEnvironment {
  public static async createUser(args: CreateUserArgs): Promise<
    Readonly<{
      userID: string;
      user: UserPresenter;
    }>
  > {
    const { nameOfFirstSharingGroupForUser } = args;
    const cc = await TestCC.create();
    initTestPlugins(cc);
    await CreateUnregisteredUserController.execute(cc, args);

    const tokenFromRegistrationEmail =
      TestAuthenticationEmailInbox.get(emailAddress).getRegistrationToken();

    const user = await RegisterUserController.execute(cc, {
      tokenFromRegistrationEmail,
    });
    const userID = await user.getID();

    if (nameOfFirstSharingGroupForUser !== undefined) {
      await this.withExistingUserAsViewer(userID, async ({ cc }) => {
        await CreateSharingGroupController.execute(cc, {
          displayName: nameOfFirstSharingGroupForUser,
        });
      });
    }

    return {
      user,
      userID,
    };
  }

  public static async withNewUserAsViewer<T>(
    args: CreateUserArgs,
    callback: (args: CallbackArgs) => Promise<T>,
  ): Promise<T> {
    const { userID } = await this.createUser(args);
    return await this.withExistingUserAsViewer(userID, callback);
  }

  public static async withExistingUserAsViewer<T>(
    userID: string,
    callback: (args: CallbackArgs) => Promise<T>,
  ): Promise<T> {
    const cc = await TestCC.create();
    initTestPlugins(cc);
    await this.setViewer(cc, userID);
    const sharingGroupNameToID = await this.getSharingGroupNameToID(cc);
    return await callback({ cc, sharingGroupNameToID });
  }

  private static async setViewer(cc: CC, userID: string): Promise<void> {
    TestViewerContextInitializer.setLoggedInUser(cc, userID);

    // cc.getPlugin(ViewerContextInitializer).setLoggedInUser();
    initializeViewerContext(cc);

    /**
     * For now, we will create the row directly and insert it into the in-memory
     * database. However, in the future, we should use the real APIs to create
     * test data.
     */
    // const row = new TestUserInMemoryDatabaseRow({ id, ...properties });
    // TestUserInMemoryDatabase.set(id, row);

    // await ViewerPublic.initializeViewerContext(cc, authenticatedID);
    const viewer = Viewer.getUser(cc);
    const viewerID = await viewer?.getID();
    if (viewerID !== userID) {
      throw new Error('Failed to create viewer or set viewer context');
    }
  }

  private static async getSharingGroupNameToID(
    cc: CC,
  ): Promise<(name: string) => string> {
    const sharingGroupArray = await GetAllSharingGroupsController.execute(cc);
    const sharingGroupMap: Map<string, string> = new Map(
      await Promise.all(
        sharingGroupArray.map(
          async (
            sharingGroup: SharingGroupPresenter,
          ): Promise<[string, string]> => {
            const sharingGroupName = await sharingGroup.getDisplayName();
            const sharingGroupID = await sharingGroup.getID();
            return [sharingGroupName, sharingGroupID];
          },
        ),
      ),
    );
    return sharingGroupNameToID;
    function sharingGroupNameToID(name: string): string {
      const id = sharingGroupMap.get(name);
      if (id === undefined) {
        throw new Error(
          `User does not have access to sharing group with name: ${name}`,
        );
      }
      return id;
    }
  }
}
