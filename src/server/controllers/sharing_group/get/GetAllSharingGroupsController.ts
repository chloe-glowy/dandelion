import { CC } from 'src/server/context_container/public/ContextContainer';
import {
  GetAllSharingGroupsControllerArgs,
  GetAllSharingGroupsControllerResult,
} from 'src/server/controllers/sharing_group/get/types/GetAllSharingGroupsControllerTypes';
import { GetAllSharingGroupsInteractor } from 'src/server/interactors/sharing_group/get/GetAllSharingGroupsInteractor';
import { SharingGroupPresenter } from 'src/server/presenters/public/sharing_group/SharingGroupPresenter';

export abstract class GetAllSharingGroupsController {
  public static async execute(
    cc: CC,
    args: GetAllSharingGroupsControllerArgs = undefined,
  ): Promise<GetAllSharingGroupsControllerResult> {
    const { sharingGroups } = await GetAllSharingGroupsInteractor.execute(
      cc,
      args,
    );
    return {
      sharingGroups: sharingGroups.map(
        (sharingGroup) => new SharingGroupPresenter(cc, sharingGroup),
      ),
    };
  }
}
