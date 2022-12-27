import { CreateUserController } from 'src/server/controllers/user/create/CreateUserController';
import { User } from 'src/server/entities/public/user/User';
import { TestEnvironment } from 'src/server/tests/application/mocks/main/TestEnvironment';

describe('UserLoad', () => {
  it('Does not load the user if an incorrect ID is given', async () => {
    const env = new TestEnvironment();
    const idForUserA = await env.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: 'User A',
      });
      return await user.getID();
    });
    await env.withExistingUserAsViewer(idForUserA, async ({ cc }) => {
      const userFromLoad = await User.load(cc, idForUserA + '-fake-id-suffix');
      expect(userFromLoad).toBeNull();
    });
  });

  it('Does not load the user if logged out', async () => {
    const env = new TestEnvironment();
    const idForUserA = await env.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: 'User A',
      });
      return await user.getID();
    });
    await env.withLoggedOutViewer(async ({ cc }) => {
      const userFromLoad = await User.load(cc, idForUserA);
      expect(userFromLoad).toBeNull();
    });
  });

  it('Does not load the user if an ID of another user is given, if they are not in a sharing group together', async () => {
    const env = new TestEnvironment();
    const idForUserA = await env.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: 'User A',
      });
      return await user.getID();
    });
    const idForUserB = await env.withLoggedOutViewer(async ({ cc }) => {
      const { user } = await CreateUserController.execute(cc, {
        displayName: 'User B',
      });
      return await user.getID();
    });
    await env.withExistingUserAsViewer(idForUserA, async ({ cc }) => {
      const userFromLoad = await User.load(cc, idForUserB);
      expect(userFromLoad).toBeNull();
    });
  });
});
