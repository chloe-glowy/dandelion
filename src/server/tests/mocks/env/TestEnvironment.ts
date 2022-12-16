type Args = {
  viewerDisplayName: string;
  viewersSoleSharingGroupName: string;
};

type Response = {
  cc: CC;
  viewersFirstSharingGroupID: string;
}

export abstract class TestEnvironment {
  public static async init({
    viewerDisplayName,
    viewersSoleSharingGroupName,
  }: Args): Promise<Response> {
    const cc = await TestCC.create();
    const viewersFirstSharingGroupID = await TestSharingGroup.create({
      cc,
      name: viewersSoleSharingGroupName,
    });
    await TestUser.createViewer(cc, {
      displayName: viewerDisplayName,
      sharingGroupIDs: [viewersFirstSharingGroupID],
    });
    return {
      cc,
      viewersFirstSharingGroupID,
    };
  }
}