import { CreateAidRequestsController } from 'src/server/controllers/create_aid_requests/CreateAidRequestsController';
import { UnableToLoadEntityError } from 'src/server/entities/public/errors/UnableToLoadEntityError';
import { TestMain } from 'src/server/tests/application/mocks/main/TestMain';

describe('CreateAidRequestsController', () => {
  it('provides information about a newly created request', async () => {
    await TestMain.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        nameOfFirstSharingGroupForUser: 'My Sharing Group',
      },
      async ({ cc, sharingGroupNameToID }) => {
        const [aidRequest] = (
          await CreateAidRequestsController.execute(cc, {
            sharingGroupID: sharingGroupNameToID('My Sharing Group'),
            whatIsNeeded: ['a tomato'],
            whoIsItFor: ['Keeley'],
          })
        ).aidRequests;
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
      },
    );
  });

  it('fails if the sharing group does not exist', async () => {
    const exception: null | Error = await TestMain.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        nameOfFirstSharingGroupForUser: 'My Sharing Group',
      },
      async ({ cc, sharingGroupNameToID }) => {
        let ex: null | Error = null;
        try {
          await CreateAidRequestsController.execute(cc, {
            sharingGroupID:
              sharingGroupNameToID('My Sharing Group') + '-not-real',
            whatIsNeeded: ['a tomato'],
            whoIsItFor: ['Keeley'],
          });
        } catch (e) {
          if (e instanceof Error) {
            ex = e;
          }
        }
        return ex;
      },
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

  it('fails if the user is not a member of the sharing group', async () => {
    const idForVeronicasSharingGroup = await TestMain.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        nameOfFirstSharingGroupForUser: "Veronica's Sharing Group",
      },
      async ({ sharingGroupNameToID }) => {
        return sharingGroupNameToID("Veronica's Sharing Group");
      },
    );

    const exception: null | Error = await TestMain.withNewUserAsViewer(
      {
        displayNameForUser: 'Claire',
        nameOfFirstSharingGroupForUser: "Claire's Sharing Group",
      },
      async ({ cc }) => {
        let ex: null | Error = null;
        try {
          await CreateAidRequestsController.execute(cc, {
            sharingGroupID: idForVeronicasSharingGroup,
            whatIsNeeded: ['two tomatoes'],
            whoIsItFor: ['Erica'],
          });
        } catch (e) {
          if (e instanceof Error) {
            ex = e;
          }
        }
        return ex;
      },
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

  // it('Can create multiple aid requests at once for the same person')
  // it('Can create multiple aid requests at once for different people')
  // it('Can create multiple aid requests of different items for different people')
  // Test the postpublish summary on the above tests
  // Test all the methods on AidRequestPresenter for the above tests
  // it('Fails if the user is not logged in')
  // it('Fails if the viewer is System') // This one should fail at the Controller level, but succeed at the Interactor level
});
