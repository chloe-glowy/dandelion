import { CreateSharingGroupController } from 'src/server/controllers/sharing_group/create/CreateSharingGroupController';
import { testCatch } from 'src/server/tests/application/helpers/testCatch';
import { TestEnvironment } from 'src/server/tests/application/mocks/main/TestEnvironment';

describe('CreateSharingGroupController', () => {
  it('can create a sharing group for a user', async () => {
    const env = new TestEnvironment();
    await env.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
      },
      async ({ cc }) => {
        const { sharingGroup } = await CreateSharingGroupController.execute(
          cc,
          {
            displayName: 'Pizza Delivery Crew',
          },
        );
        expect(await sharingGroup.getDisplayName()).toBe('Pizza Delivery Crew');
      },
    );
  });

  it('fails if the viewer is logged out', async () => {
    const env = new TestEnvironment();
    await env.withLoggedOutViewer(async ({ cc }) => {
      const ex = await testCatch(async () => {
        await CreateSharingGroupController.execute(cc, {
          displayName: 'Pizza Delivery Crew',
        });
      });
      expect(ex).toBeDefined();
    });
  });

  it('fails if the viewer is the System', async () => {
    const env = new TestEnvironment();
    await env.withSystemAsViewer(async ({ cc }) => {
      const ex = await testCatch(async () => {
        await CreateSharingGroupController.execute(cc, {
          displayName: 'Pizza Delivery Crew',
        });
      });
      expect(ex).toBeDefined();
    });
  });
});
