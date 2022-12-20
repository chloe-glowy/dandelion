import { CreateSharingGroupInteractorArgs } from 'src/server/interactors/sharing_group/create/types/CreateSharingGroupInteractorTypes';
import { SharingGroupPresenter } from 'src/server/presenters/public/sharing_group/SharingGroupPresenter';

export type CreateSharingGroupControllerArgs = CreateSharingGroupInteractorArgs;

export type CreateSharingGroupControllerResult = Readonly<{
  sharingGroup: SharingGroupPresenter;
}>;
