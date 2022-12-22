import { CC } from 'src/server/context_container/public/ContextContainer';
import {
  CreateSharingGroupControllerArgs,
  CreateSharingGroupControllerResult,
} from 'src/server/controllers/sharing_group/create/types/CreateSharingGroupControllerTypes';
import { CreateSharingGroupInteractor } from 'src/server/interactors/sharing_group/create/CreateSharingGroupInteractor';
import { SharingGroupPresenter } from 'src/server/presenters/public/sharing_group/SharingGroupPresenter';

export abstract class CreateSharingGroupController {
  public static async execute(
    cc: CC,
    args: CreateSharingGroupControllerArgs,
  ): Promise<CreateSharingGroupControllerResult> {
    const { sharingGroup } = await CreateSharingGroupInteractor.execute(
      cc,
      args,
    );
    return { sharingGroup: new SharingGroupPresenter(cc, sharingGroup) };
  }
}
