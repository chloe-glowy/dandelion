import { ViewerPublic } from 'src/server/entities/public/viewer/ViewerPublic';
import { TestCC } from 'src/server/tests/application/cc/TestCC';
import { testCatch } from 'src/server/tests/application/helpers/testCatch';
import {
  TestEnvironment,
  TestEnvironmentAuthenticatedID,
} from 'src/server/tests/application/mocks/main/TestEnvironment';
import { createTestPlugins } from 'src/server/tests/application/mocks/plugins/createTestPlugins';

describe('ViewerPublic', () => {
  it('can initialize viewer context to a logged out viewer', async () => {
    const cc = await TestCC.create(createTestPlugins());
    await ViewerPublic.initializeViewerContext(
      cc,
      new TestEnvironmentAuthenticatedID({
        isSystem: false,
        userID: null,
      }),
    );
    expect(ViewerPublic.isLoggedIn(cc)).toBe(false);
  });

  it('can initialize viewer context to a logged in viewer', async () => {
    const plugins = createTestPlugins();
    const env = new TestEnvironment(plugins);
    const { userID } = await env.createUser({
      displayNameForUser: 'Veronica',
    });
    const cc = await TestCC.create(plugins);
    await ViewerPublic.initializeViewerContext(
      cc,
      new TestEnvironmentAuthenticatedID({
        isSystem: false,
        userID,
      }),
    );
    expect(ViewerPublic.isLoggedIn(cc)).toBe(true);
  });

  it('fails if you initialize it twice on the same cc', async () => {
    const cc = await TestCC.create(createTestPlugins());
    await ViewerPublic.initializeViewerContext(
      cc,
      new TestEnvironmentAuthenticatedID({
        isSystem: false,
        userID: null,
      }),
    );
    const ex = await testCatch(async () => {
      await ViewerPublic.initializeViewerContext(
        cc,
        new TestEnvironmentAuthenticatedID({
          isSystem: false,
          userID: null,
        }),
      );
    });
    expect(ex).toBeDefined();
  });

  it('fails if you do not initialize but check if the user is logged in', async () => {
    const cc = await TestCC.create(createTestPlugins());
    const ex = await testCatch(async () => {
      ViewerPublic.isLoggedIn(cc);
    });
    expect(ex).toBeDefined();
  });
});
