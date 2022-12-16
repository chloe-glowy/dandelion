import { CreateAidRequestsController } from 'src/server/controllers/create_aid_requests/CreateAidRequestsController';
import { TestCC } from 'src/server/tests/cc/TestCC';
import { TestUser } from 'src/server/tests/mocks/db/user/TestUser';
import { initTestPlugins } from 'src/server/tests/mocks/initTestPlugins';

describe('CreateAidRequestsController', async () => {
  initTestPlugins();
  const { cc, viewersFirstSharingGroupID } = await TestEnvironment.init({
    viewerDisplayName: 'Veronica',
    viewersSoleSharingGroupName: 'My Sharing Group',
  });

  const cc = await TestCC.create();
  await TestUser.createViewer(cc, {
    displayName: 'Veronica',
  });
  const [aidRequest] = (
    await CreateAidRequestsController.execute(cc, {
      sharingGroupID: '123',
      whatIsNeeded: ['a tomato'],
      whoIsItFor: ['Keeley'],
    })
  ).aidRequests;

  it('gets who recorded it', async () => {
    const userPresenter = await aidRequest.getWhoRecordedIt();
    expect(userPresenter).not.toBeNull();
    if (userPresenter == null) {
      throw new Error('userPresenter is null');
    }
    const displayName = await userPresenter.getDisplayName();
    expect(displayName).toBe('Veronica');
  });

  it('gets what is needed', async () => {
    const whatIsNeeded = await aidRequest.getWhatIsNeeded();
    expect(whatIsNeeded).toBe('a tomato');
  });

  it('gets who is it for', async () => {
    const whoIsItFor = await aidRequest.getWhoIsItFor();
    expect(whoIsItFor).toBe('Keeley');
  });
});
