import { CreateUserController } from 'src/server/controllers/user/create/CreateUserController';
import { Viewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { User } from 'src/server/entities/public/user/User';
import { testCatch } from 'src/server/tests/application/helpers/testCatch';
import { TestEnvironment } from 'src/server/tests/application/mocks/main/TestEnvironment';

describe('CreateUserController', () => {
  it('Creates a user if logged out', async () => {
    const env = new TestEnvironment();
    await env.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: 'Veronica',
      });
      expect(await user.getID()).toBeDefined();
      expect(await user.getDisplayName()).toEqual('Veronica');
    });
  });

  it('Persists the user', async () => {
    const env = new TestEnvironment();
    const userID = await env.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: 'Lola',
      });
      return await user.getID();
    });
    await env.withExistingUserAsViewer(userID, async ({ cc }) => {
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
    const env = new TestEnvironment();
    const userID = await env.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: 'Lola',
      });
      return await user.getID();
    });
    await env.withExistingUserAsViewer(userID, async ({ cc }) => {
      const ex = await testCatch(
        async () =>
          await CreateUserController.execute(cc, {
            displayName: 'Erica',
          }),
      );
      expect(ex).toBeDefined();
    });
  });
});
