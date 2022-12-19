import { CC } from 'src/server/context_container/public/ContextContainer';
import { TestCC } from 'src/server/tests/application/cc/TestCC';
import { TestSharingGroup } from 'src/server/tests/application/mocks/db/sharing_group/TestSharingGroup';
import { TestUser } from 'src/server/tests/application/mocks/db/user/TestUser';

type Args = {
  viewerDisplayName: string;
  viewersSoleSharingGroupName: string;
};

type Response = {
  cc: CC;
  viewersFirstSharingGroupID: string;
};

export abstract class TestEnvironment {
  public static async init({
    viewerDisplayName,
    viewersSoleSharingGroupName,
  }: Args): Promise<Response> {
    const cc = await TestCC.create();
    await TestUser.createViewer(cc, {
      displayName: viewerDisplayName,
      sharingGroupIDs: [],
    });
    const viewersSoleSharingGroup = await TestSharingGroup.create(cc, {
      displayName: viewersSoleSharingGroupName,
    });
    const viewersFirstSharingGroupID = await viewersSoleSharingGroup.getID();
    return {
      cc,
      viewersFirstSharingGroupID,
    };
  }
}
