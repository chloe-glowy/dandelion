import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';

export type GetAllSharingGroupsInteractorArgs = undefined;

export type GetAllSharingGroupsInteractorResult = Readonly<{
  sharingGroups: ReadonlyArray<SharingGroup>;
}>;
