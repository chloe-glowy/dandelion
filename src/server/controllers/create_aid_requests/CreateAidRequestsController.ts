import { CC } from 'src/server/context_container/public/ContextContainer';
import {
  CreateAidRequestsControllerArgs,
  CreateAidRequestsControllerResult,
} from 'src/server/controllers/create_aid_requests/types/CreateAidRequestsControllerTypes';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { ViewerPublic } from 'src/server/entities/public/viewer/ViewerPublic';
import { CreateAidRequestsInteractor } from 'src/server/interactors/create_aid_requests/CreateAidRequestsInteractor';
import { AidRequestPresenter } from 'src/server/presenters/public/aid_request/AidRequestPresenter';

export abstract class CreateAidRequestsController {
  public static async execute(
    cc: CC,
    args: CreateAidRequestsControllerArgs,
  ): Promise<CreateAidRequestsControllerResult> {
    const [result, postpublishSummary] = await Promise.all([
      CreateAidRequestsInteractor.execute(cc, args),
      CreateAidRequestsController.getPostpublishSummary(cc, args),
    ]);
    const aidRequests = result.aidRequests.map(
      (aidRequest) => new AidRequestPresenter(cc, aidRequest),
    );
    return {
      aidRequests,
      postpublishSummary,
    };
  }

  /**
   * TODO -- Should this be in a presenter?
   */
  private static async getPostpublishSummary(
    cc: CC,
    args: CreateAidRequestsControllerArgs,
  ): Promise<string> {
    const whatIsNeeded = CreateAidRequestsController.summarizeList(
      args.whatIsNeeded,
      'requests',
    );
    const whoIsItFor = CreateAidRequestsController.summarizeList(
      args.whoIsItFor,
      'people',
    );
    const sharingGroupSummary =
      await CreateAidRequestsController.getSharingGroupSummary(
        cc,
        args.sharingGroupID,
      );
    return `Recorded ${whatIsNeeded} for ${whoIsItFor}${sharingGroupSummary}`;
  }

  private static summarizeList(
    list: ReadonlyArray<string>,
    elemNounPlural: string,
  ): string {
    if (list.length === 1) {
      return list[0];
    } else {
      return `${list.length} ${elemNounPlural}`;
    }
  }

  private static async getSharingGroupSummary(
    cc: CC,
    sharingGroupID: string,
  ): Promise<string> {
    const viewerIsInMultipleSharingGroups =
      await ViewerPublic.hasAccessToMultipleSharingGroups(cc);
    if (!viewerIsInMultipleSharingGroups) {
      return '';
    }

    const sharingGroup = await SharingGroup.load(cc, sharingGroupID);
    if (sharingGroup == null) {
      return '';
    }

    const sharingGroupDisplayName = await sharingGroup.getDisplayName();

    return ` (${sharingGroupDisplayName})`;
  }
}
