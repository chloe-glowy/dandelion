import { CreateUserController } from 'src/server/controllers/user/create/CreateUserController';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import { User } from 'src/server/entities/public/user/User';
import { TestMain } from 'src/server/tests/application/mocks/main/TestMain';

describe('CreateUserController', () => {
  it('Creates a user if logged out', async () => {
    await TestMain.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: 'Veronica',
      });
      expect(await user.getID()).toBeDefined();
      expect(await user.getDisplayName()).toEqual('Veronica');
    });
  });

  it('Persists the user', async () => {
    const userID = await TestMain.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: 'Lola',
      });
      return await user.getID();
    });
    await TestMain.withExistingUserAsViewer(userID, async ({ cc }) => {
      const user = Viewer.getUser(cc);
      if (user == null) {
        throw new Error('User is null');
      }
      expect(await user.getID()).toEqual(userID);
      expect(await user.getDisplayName()).toEqual('Lola');
      const userFromLoad = await User.load(cc, userID);
      if (userFromLoad == null) {
        throw new Error('User from load is null');
      }
      expect(await user.isSameUser(userFromLoad)).toBe(true);
      expect(await userFromLoad?.isSameUser(user)).toBe(true);
      expect(await user.getIsViewer()).toBe(true);
      expect(await userFromLoad?.getIsViewer()).toBe(true);
    });
  });

  it('Fails if a user is already logged in', async () => {
    const userID = await TestMain.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: 'Lola',
      });
      return await user.getID();
    });
    await TestMain.withExistingUserAsViewer(userID, async ({ cc }) => {
      let ex: Error | undefined;
      try {
        await CreateUserController.execute(cc, {
          displayName: 'Erica',
        });
      } catch (e) {
        if (e instanceof Error) {
          ex = e;
        }
      }
      expect(ex).toBeDefined();
    });
  });
});
