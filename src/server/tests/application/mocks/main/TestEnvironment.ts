import { CC } from 'src/server/context_container/public/ContextContainer';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';
import { CreateSharingGroupController } from 'src/server/controllers/sharing_group/create/CreateSharingGroupController';
import { GetAllSharingGroupsController } from 'src/server/controllers/sharing_group/get/GetAllSharingGroupsController';
import { CreateUserController } from 'src/server/controllers/user/create/CreateUserController';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { AuthenticatedUserID } from 'src/server/entities/public/user/AuthenticatedUserID';
import { User } from 'src/server/entities/public/user/User';
import { ViewerPublic } from 'src/server/entities/public/viewer/ViewerPublic';
import { SharingGroupPresenter } from 'src/server/presenters/public/sharing_group/SharingGroupPresenter';
import { UserPresenter } from 'src/server/presenters/public/user/UserPresenter';
import { TestCC } from 'src/server/tests/application/cc/TestCC';
import { createTestPlugins } from 'src/server/tests/application/mocks/plugins/createTestPlugins';

type CreateUserArgs = Readonly<{
  displayNameForUser: string;
  namesOfSharingGroupsToCreateForUser?: string[];
}>;

type LoggedOutCallbackArgs = Readonly<{
  cc: CC;
}>;

type LoggedInCallbackArgs = LoggedOutCallbackArgs &
  Readonly<{
    sharingGroupNameToID: (name: string) => string;
    viewerID: string;
    viewer: User;
  }>;

export class TestEnvironment {
  private plugins: PluginCollection;

  public constructor() {
    this.plugins = createTestPlugins();
  }

  public async withNewUserAsViewer<T>(
    args: CreateUserArgs,
    callback: (args: LoggedInCallbackArgs) => Promise<T>,
  ): Promise<T> {
    const { userID } = await this.createUser(args);
    return await this.withExistingUserAsViewer(userID, callback);
  }

  public async withExistingUserAsViewer<T>(
    userID: string,
    callback: (args: LoggedInCallbackArgs) => Promise<T>,
  ): Promise<T> {
    return await this.withViewer(
      userID,
      async ({ cc }: LoggedOutCallbackArgs) => {
        const sharingGroupNameToID = await this.getSharingGroupNameToID(cc);
        const viewer = Viewer.getUser(cc);
        if (viewer == null) {
          throw new Error('viewer is null');
        }
        const viewerID = await viewer.getID();
        return await callback({ cc, sharingGroupNameToID, viewer, viewerID });
      },
    );
  }

  public async createUser(args: CreateUserArgs): Promise<
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

    const { namesOfSharingGroupsToCreateForUser } = args;
    if (namesOfSharingGroupsToCreateForUser !== undefined) {
      await this.withExistingUserAsViewer(userID, async ({ cc }) => {
        for (const displayName of namesOfSharingGroupsToCreateForUser) {
          await CreateSharingGroupController.execute(cc, {
            displayName,
          });
        }
      });
    }

    return { user, userID };
  }

  public async withLoggedOutViewer<T>(
    callback: (args: LoggedOutCallbackArgs) => Promise<T>,
  ): Promise<T> {
    return await this.withViewer(null, callback);
  }

  private async withViewer<T>(
    userID: string | null,
    callback: (args: LoggedOutCallbackArgs) => Promise<T>,
  ): Promise<T> {
    const cc = await TestCC.create(this.plugins);
    await ViewerPublic.initializeViewerContext(
      cc,
      new TestEnvironmentAuthenticatedID(userID),
    );
    try {
      return await callback({ cc });
    } finally {
      await ViewerPublic.unsetViewerContext(cc);
    }
  }

  private async getSharingGroupNameToID(
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

class TestEnvironmentAuthenticatedID implements AuthenticatedUserID {
  constructor(public readonly id: string | null) {}
}
