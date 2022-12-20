import { CC } from 'src/server/context_container/public/ContextContainer';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import {
  CreateSharingGroupInteractorArgs,
  CreateSharingGroupInteractorResult,
} from 'src/server/interactors/sharing_group/create/types/CreateSharingGroupInteractorTypes';

export abstract class CreateSharingGroupInteractor {
  public static async execute(
    cc: CC,
    args: CreateSharingGroupInteractorArgs,
  ): Promise<CreateSharingGroupInteractorResult> {
    const sharingGroup = await SharingGroup.create(cc, args);
    return { sharingGroup };
  }
}
