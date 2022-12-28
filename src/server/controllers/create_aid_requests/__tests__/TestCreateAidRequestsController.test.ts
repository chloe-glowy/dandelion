import { CreateAidRequestsController } from 'src/server/controllers/create_aid_requests/CreateAidRequestsController';
import { AidRequestDBGatewayPlugin } from 'src/server/entities/public/aid_request/plugins/AidRequestDBGatewayPlugin';
import { UnableToLoadEntityError } from 'src/server/entities/public/errors/UnableToLoadEntityError';
import { testCatch } from 'src/server/tests/application/helpers/testCatch';
import { TestAidRequestDBGateway } from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestDBGateway';
import { TestEnvironment } from 'src/server/tests/application/mocks/main/TestEnvironment';

describe('CreateAidRequestsController', () => {
  it('different test environments do not interfere', async () => {
    const env1 = new TestEnvironment();
    const env2 = new TestEnvironment();
    const userIdA = await env1.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        namesOfSharingGroupsToCreateForUser: ['My Sharing Group'],
      },
      async ({ cc, sharingGroupNameToID, viewerID }) => {
        await CreateAidRequestsController.execute(cc, {
          sharingGroupID: sharingGroupNameToID('My Sharing Group'),
          whatIsNeeded: ['a tomato'],
          whoIsItFor: ['Keeley'],
        });
        return viewerID;
      },
    );
    const userIdB = await env2.withNewUserAsViewer(
      {
        displayNameForUser: 'Keeley',
        namesOfSharingGroupsToCreateForUser: ['My Other Sharing Group'],
      },
      async ({ cc, sharingGroupNameToID, viewerID }) => {
        await CreateAidRequestsController.execute(cc, {
          sharingGroupID: sharingGroupNameToID('My Other Sharing Group'),
          whatIsNeeded: ['a potato'],
          whoIsItFor: ['Veronica'],
        });
        return viewerID;
      },
    );
    await env1.withExistingUserAsViewer(userIdA, async ({ cc }) => {
      const db = (
        cc.getPlugin(AidRequestDBGatewayPlugin) as TestAidRequestDBGateway
      ).db;
      expect(db.aidRequests.size).toBe(1);
      for (const aidRequest of db.aidRequests.values()) {
        expect(aidRequest.properties.whatIsNeeded).toBe('a tomato');
      }
    });
    await env2.withExistingUserAsViewer(userIdB, async ({ cc }) => {
      const db = (
        cc.getPlugin(AidRequestDBGatewayPlugin) as TestAidRequestDBGateway
      ).db;
      expect(db.aidRequests.size).toBe(1);
      for (const aidRequest of db.aidRequests.values()) {
        expect(aidRequest.properties.whatIsNeeded).toBe('a potato');
      }
    });
  });

  it('provides information about a newly created request', async () => {
    const env = new TestEnvironment();
    await env.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        namesOfSharingGroupsToCreateForUser: ['My Sharing Group'],
      },
      async ({ cc, sharingGroupNameToID }) => {
        const response = await CreateAidRequestsController.execute(cc, {
          sharingGroupID: sharingGroupNameToID('My Sharing Group'),
          whatIsNeeded: ['a tomato'],
          whoIsItFor: ['Keeley'],
        });
        const [aidRequest] = response.aidRequests;
        const userPresenter = await aidRequest.getWhoRecordedIt();
        expect(userPresenter).not.toBeNull();
        if (userPresenter == null) {
          throw new Error('userPresenter is null');
        }
        const displayName = await userPresenter.getDisplayName();
        expect(displayName).toBe('Veronica');

        const whatIsNeeded = await aidRequest.getWhatIsNeeded();
        expect(whatIsNeeded).toBe('a tomato');

        const whoIsItFor = await aidRequest.getWhoIsItFor();
        expect(whoIsItFor).toBe('Keeley');

        expect(response.postpublishSummary).toBe(
          'Recorded a tomato for Keeley',
        );
      },
    );
  });

  it('fails if the sharing group does not exist', async () => {
    const env = new TestEnvironment();
    const exception: null | Error = await env.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        namesOfSharingGroupsToCreateForUser: ['My Sharing Group'],
      },
      async ({ cc, sharingGroupNameToID }) =>
        await testCatch(
          async () =>
            await CreateAidRequestsController.execute(cc, {
              sharingGroupID:
                sharingGroupNameToID('My Sharing Group') + '-not-real',
              whatIsNeeded: ['a tomato'],
              whoIsItFor: ['Keeley'],
            }),
        ),
    );
    expect(exception).not.toBeNull();
    if (exception == null) {
      throw new Error('Expected exception to be thrown');
    }
    expect(exception instanceof UnableToLoadEntityError).toBe(true);
    expect(exception?.message).toMatch(
      /Unable to load SharingGroup with id .+/,
    );
  });

  it('fails if the viewer is logged out', async () => {
    const env = new TestEnvironment();
    const sharingGroupID = await env.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        namesOfSharingGroupsToCreateForUser: ['My Sharing Group'],
      },
      async ({ sharingGroupNameToID }) => {
        return sharingGroupNameToID('My Sharing Group');
      },
    );
    await env.withLoggedOutViewer(async ({ cc }) => {
      const exception = await testCatch(
        async () =>
          await CreateAidRequestsController.execute(cc, {
            sharingGroupID,
            whatIsNeeded: ['a tomato'],
            whoIsItFor: ['Keeley'],
          }),
      );
      expect(exception).toBeDefined();
    });
  });

  it('fails if the user is not a member of the sharing group', async () => {
    const env = new TestEnvironment();
    const idForVeronicasSharingGroup = await env.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        namesOfSharingGroupsToCreateForUser: ["Veronica's Sharing Group"],
      },
      async ({ sharingGroupNameToID }) => {
        return sharingGroupNameToID("Veronica's Sharing Group");
      },
    );

    const exception: null | Error = await env.withNewUserAsViewer(
      {
        displayNameForUser: 'Claire',
        namesOfSharingGroupsToCreateForUser: ["Claire's Sharing Group"],
      },
      async ({ cc }) =>
        await testCatch(
          async () =>
            await CreateAidRequestsController.execute(cc, {
              sharingGroupID: idForVeronicasSharingGroup,
              whatIsNeeded: ['two tomatoes'],
              whoIsItFor: ['Erica'],
            }),
        ),
    );
    expect(exception).not.toBeNull();
    if (exception == null) {
      throw new Error('Expected exception to be thrown');
    }
    expect(exception instanceof UnableToLoadEntityError).toBe(true);
    expect(exception?.message).toMatch(
      /Unable to load SharingGroup with id .+/,
    );
  });

  it('Can create multiple aid requests at once for the same person', async () => {
    const env = new TestEnvironment();
    await env.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        namesOfSharingGroupsToCreateForUser: ['My Sharing Group'],
      },
      async ({ cc, sharingGroupNameToID }) => {
        const response = await CreateAidRequestsController.execute(cc, {
          sharingGroupID: sharingGroupNameToID('My Sharing Group'),
          whatIsNeeded: ['a tomato', 'a two liter bottle of soda'],
          whoIsItFor: ['Keeley'],
        });
        const [aidRequestA, aidRequestB] = response.aidRequests;

        const whatIsNeededA = await aidRequestA.getWhatIsNeeded();
        expect(whatIsNeededA).toBe('a tomato');

        const whoIsItForA = await aidRequestA.getWhoIsItFor();
        expect(whoIsItForA).toBe('Keeley');

        expect(await aidRequestB.getWhatIsNeeded()).toBe(
          'a two liter bottle of soda',
        );
        expect(await aidRequestB.getWhoIsItFor()).toBe('Keeley');

        expect(response.postpublishSummary).toBe(
          'Recorded 2 requests for Keeley',
        );
      },
    );
  });

  it('includes the sharing group name in the postpublish summary if the user is in multiple sharing groups', async () => {
    const env = new TestEnvironment();
    await env.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        namesOfSharingGroupsToCreateForUser: [
          'My Public Sharing Group',
          'My Private Sharing Group',
        ],
      },
      async ({ cc, sharingGroupNameToID }) => {
        const response = await CreateAidRequestsController.execute(cc, {
          sharingGroupID: sharingGroupNameToID('My Private Sharing Group'),
          whatIsNeeded: ['a tomato'],
          whoIsItFor: ['Keeley'],
        });

        expect(response.postpublishSummary).toBe(
          'Recorded a tomato for Keeley (My Private Sharing Group)',
        );
      },
    );
  });

  // it('Can create multiple aid requests at once for different people')
  // it('Can create multiple aid requests of different items for different people')
  // Test the postpublish summary on the above tests
  // Test all the methods on AidRequestPresenter for the above tests
  // it('Fails if the user is not logged in')
  // it('Fails if the viewer is System') // This one should fail at the Controller level, but succeed at the Interactor level
});
