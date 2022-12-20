import { CreateAidRequestsController } from 'src/server/controllers/create_aid_requests/CreateAidRequestsController';
import { CreateAidRequestsControllerResult } from 'src/server/controllers/create_aid_requests/types/CreateAidRequestsControllerTypes';
import { TestEnvironment } from 'src/server/tests/application/mocks/env/TestEnvironment';

async function exec(): Promise<CreateAidRequestsControllerResult> {
  return await TestEnvironment.withNewUserAsViewer(
    {
      displayNameForUser: 'Veronica',
      nameOfFirstSharingGroupForUser: 'My Sharing Group',
    },
    async ({ cc, sharingGroupNameToID }) => {
      return await CreateAidRequestsController.execute(cc, {
        sharingGroupID: sharingGroupNameToID('My Sharing Group'),
        whatIsNeeded: ['a tomato'],
        whoIsItFor: ['Keeley'],
      });
    },
  );
}

describe('CreateAidRequestsController', () => {
  it('gets who recorded it', async () => {
    const [aidRequest] = (await exec()).aidRequests;
    const userPresenter = await aidRequest.getWhoRecordedIt();
    expect(userPresenter).not.toBeNull();
    if (userPresenter == null) {
      throw new Error('userPresenter is null');
    }
    const displayName = await userPresenter.getDisplayName();
    expect(displayName).toBe('Veronica');
  });

  it('gets what is needed', async () => {
    const [aidRequest] = (await exec()).aidRequests;
    const whatIsNeeded = await aidRequest.getWhatIsNeeded();
    expect(whatIsNeeded).toBe('a tomato');
  });

  it('gets who is it for', async () => {
    const [aidRequest] = (await exec()).aidRequests;
    const whoIsItFor = await aidRequest.getWhoIsItFor();
    expect(whoIsItFor).toBe('Keeley');
  });

  it('fails if the sharing group does not exist', async () => {
    const exception: null | Error = await TestEnvironment.withNewUserAsViewer(
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
    expect(exception?.message).toMatch(/SharingGroup with id .+ not found/);
  });

  // it('fails if the user is not a member of the sharing group', async () => {
  //   // TODO -- Create user A in sharing group X and user B in sharing group Y.
  //   // User B should not be able to create an aid request in sharing group X.

  //   // Also, User B should not even be able to *see* aid requests in sharing group X.
  //   // But that should be tested in a different test file.
  //   expect(false).toBe(true);
  // });
});
