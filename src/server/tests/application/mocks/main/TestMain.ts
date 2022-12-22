import { CC } from 'src/server/context_container/public/ContextContainer';
import { CreateSharingGroupController } from 'src/server/controllers/sharing_group/create/CreateSharingGroupController';
import { GetAllSharingGroupsController } from 'src/server/controllers/sharing_group/get/GetAllSharingGroupsController';
import { CreateUserController } from 'src/server/controllers/user/create/CreateUserController';
import { AuthenticatedUserID } from 'src/server/entities/public/user/AuthenticatedUserID';
import { ViewerPublic } from 'src/server/entities/public/viewer/ViewerPublic';
import { SharingGroupPresenter } from 'src/server/presenters/public/sharing_group/SharingGroupPresenter';
import { UserPresenter } from 'src/server/presenters/public/user/UserPresenter';
import { TestCC } from 'src/server/tests/application/cc/TestCC';
import { initTestPlugins } from 'src/server/tests/application/mocks/plugins/initTestPlugins';

type CreateUserArgs = Readonly<{
  displayNameForUser: string;
  nameOfFirstSharingGroupForUser?: string;
}>;

type LoggedOutCallbackArgs = Readonly<{
  cc: CC;
}>;

type LoggedInCallbackArgs = LoggedOutCallbackArgs &
  Readonly<{
    sharingGroupNameToID: (name: string) => string;
  }>;

export abstract class TestMain {
  public static async withNewUserAsViewer<T>(
    args: CreateUserArgs,
    callback: (args: LoggedInCallbackArgs) => Promise<T>,
  ): Promise<T> {
    const { userID } = await this.createUser(args);
    return await this.withExistingUserAsViewer(userID, callback);
  }

  public static async withExistingUserAsViewer<T>(
    userID: string,
    callback: (args: LoggedInCallbackArgs) => Promise<T>,
  ): Promise<T> {
    return await this.withViewer(
      userID,
      async ({ cc }: LoggedOutCallbackArgs) => {
        const sharingGroupNameToID = await this.getSharingGroupNameToID(cc);
        return await callback({ cc, sharingGroupNameToID });
      },
    );
  }

  public static async createUser(args: CreateUserArgs): Promise<
    Readonly<{
      userID: string;
      user: UserPresenter;
    }>
  > {
    const { user, userID } = await this.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: args.displayNameForUser,
      });
      const userID = await user.getID();
      return {
        user,
        userID,
      };
    });

    const { nameOfFirstSharingGroupForUser } = args;
    if (nameOfFirstSharingGroupForUser !== undefined) {
      await this.withExistingUserAsViewer(userID, async ({ cc }) => {
        await CreateSharingGroupController.execute(cc, {
          displayName: nameOfFirstSharingGroupForUser,
        });
      });
    }

    return { user, userID };
  }

  public static async withLoggedOutViewer<T>(
    callback: (args: LoggedOutCallbackArgs) => Promise<T>,
  ): Promise<T> {
    return await this.withViewer(null, callback);
  }

  private static async withViewer<T>(
    userID: string | null,
    callback: (args: LoggedOutCallbackArgs) => Promise<T>,
  ): Promise<T> {
    const cc = await TestCC.create();
    initTestPlugins(cc);
    await ViewerPublic.initializeViewerContext(
      cc,
      new TestMainAuthenticatedID(userID),
    );
    try {
      return await callback({ cc });
    } finally {
      await ViewerPublic.unsetViewerContext(cc);
    }
  }

  private static async getSharingGroupNameToID(
    cc: CC,
  ): Promise<(name: string) => string> {
    const { sharingGroups } = await GetAllSharingGroupsController.execute(cc);
    const sharingGroupMap: Map<string, string> = new Map(
      await Promise.all(
        sharingGroups.map(
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

class TestMainAuthenticatedID implements AuthenticatedUserID {
  constructor(public readonly id: string | null) {}
}
