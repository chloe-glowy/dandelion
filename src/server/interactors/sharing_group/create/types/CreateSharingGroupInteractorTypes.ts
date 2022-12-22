import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';

export type CreateSharingGroupInteractorArgs = Readonly<{
  displayName: string;
}>;

export type CreateSharingGroupInteractorResult = Readonly<{
  sharingGroup: SharingGroup;
}>;
