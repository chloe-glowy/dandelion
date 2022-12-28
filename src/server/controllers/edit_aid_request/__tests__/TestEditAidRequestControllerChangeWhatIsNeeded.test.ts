import { CreateAidRequestsController } from 'src/server/controllers/create_aid_requests/CreateAidRequestsController';
import { EditAidRequestController } from 'src/server/controllers/edit_aid_request/EditAidRequestController';
import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';
import { testCatch } from 'src/server/tests/application/helpers/testCatch';
import { TestEnvironment } from 'src/server/tests/application/mocks/main/TestEnvironment';

describe('EditAidRequestController', () => {
  it('Can change What Is Needed', async () => {
    const env = new TestEnvironment();
    await env.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        namesOfSharingGroupsToCreateForUser: ['My Sharing Group'],
      },
      async ({ cc, sharingGroupNameToID }) => {
        const [aidRequest] = (
          await CreateAidRequestsController.execute(cc, {
            sharingGroupID: sharingGroupNameToID('My Sharing Group'),
            whatIsNeeded: ['a tomato'],
            whoIsItFor: ['Keeley'],
          })
        ).aidRequests;
        const aidRequestID = await aidRequest.getID();
        const { aidRequest: updatedAidRequest } =
          await EditAidRequestController.execute(cc, {
            action: new AidRequestChangedWhatIsNeededAction(
              'a tomato',
              'a potato',
            ),
            aidRequestID,
          });

        const userPresenter = await updatedAidRequest.getWhoRecordedIt();
        expect(userPresenter).not.toBeNull();
        if (userPresenter == null) {
          throw new Error('userPresenter is null');
        }
        const displayName = await userPresenter.getDisplayName();
        expect(displayName).toBe('Veronica');

        const whatIsNeeded = await aidRequest.getWhatIsNeeded();
        expect(whatIsNeeded).toBe('a potato');

        const whoIsItFor = await aidRequest.getWhoIsItFor();
        expect(whoIsItFor).toBe('Keeley');
      },
    );
  });

  it('Fails if oldValue is incorrect', async () => {
    const env = new TestEnvironment();
    await env.withNewUserAsViewer(
      {
        displayNameForUser: 'Veronica',
        namesOfSharingGroupsToCreateForUser: ['My Sharing Group'],
      },
      async ({ cc, sharingGroupNameToID }) => {
        const [aidRequest] = (
          await CreateAidRequestsController.execute(cc, {
            sharingGroupID: sharingGroupNameToID('My Sharing Group'),
            whatIsNeeded: ['a tomato'],
            whoIsItFor: ['Keeley'],
          })
        ).aidRequests;
        const aidRequestID = await aidRequest.getID();
        const exception = await testCatch(
          async () =>
            await EditAidRequestController.execute(cc, {
              action: new AidRequestChangedWhatIsNeededAction(
                'a pen',
                'a potato',
              ),
              aidRequestID,
            }),
        );
        expect(exception).toBeDefined();
      },
    );
  });
});
