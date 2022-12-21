import { SharingGroupPresenter } from 'src/server/presenters/public/sharing_group/SharingGroupPresenter';

export type GetAllSharingGroupsControllerArgs = undefined;

export type GetAllSharingGroupsControllerResult = Readonly<{
  sharingGroups: ReadonlyArray<SharingGroupPresenter>;
}>;
