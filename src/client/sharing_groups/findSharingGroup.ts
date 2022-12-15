import { SharingGroupListItem } from 'src/client/viewer/ViewerTypes';

export function findSharingGroup(
  sharingGroupID: string,
  sharingGroups: ReadonlyArray<SharingGroupListItem>,
): SharingGroupListItem {
  const sharingGroup = sharingGroups.find(({ id }) => id === sharingGroupID);
  if (sharingGroup == null) {
    throw new Error('Unexpected sharing group ID: ' + sharingGroupID);
  }
  return sharingGroup;
}
