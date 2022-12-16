import { CreateAidRequestsController } from 'src/server/controllers/create_aid_requests/CreateAidRequestsController';
import { CreateAidRequestsControllerResult } from 'src/server/controllers/create_aid_requests/types/CreateAidRequestsControllerTypes';
import { TestEnvironment } from 'src/server/tests/mocks/env/TestEnvironment';
import { initTestPlugins } from 'src/server/tests/mocks/initTestPlugins';

async function exec(): Promise<CreateAidRequestsControllerResult> {
  initTestPlugins();
  const { cc, viewersFirstSharingGroupID: sharingGroupID } =
    await TestEnvironment.init({
      viewerDisplayName: 'Veronica',
      viewersSoleSharingGroupName: 'My Sharing Group',
    });

  return await CreateAidRequestsController.execute(cc, {
    sharingGroupID,
    whatIsNeeded: ['a tomato'],
    whoIsItFor: ['Keeley'],
  });
}

describe('CreateAidRequestsController', () => {
  // it('gets who recorded it', async () => {
  //   const [aidRequest] = (await exec()).aidRequests;
  //   const userPresenter = await aidRequest.getWhoRecordedIt();
  //   expect(userPresenter).not.toBeNull();
  //   if (userPresenter == null) {
  //     throw new Error('userPresenter is null');
  //   }
  //   const displayName = await userPresenter.getDisplayName();
  //   expect(displayName).toBe('Veronica');
  // });

  // it('gets what is needed', async () => {
  //   const [aidRequest] = (await exec()).aidRequests;
  //   const whatIsNeeded = await aidRequest.getWhatIsNeeded();
  //   expect(whatIsNeeded).toBe('a tomato');
  // });

  it('gets who is it for', async () => {
    const [aidRequest] = (await exec()).aidRequests;
    const whoIsItFor = await aidRequest.getWhoIsItFor();
    expect(whoIsItFor).toBe('Keeley');
  });
});
