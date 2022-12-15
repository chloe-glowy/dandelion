import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';

export interface UserDBProxy {
  getDisplayName(): Promise<string>;
  getID(): Promise<string>;
  getIsInMultipleSharingGroups(): Promise<boolean>;
  getIsMemberOfSharingGroupID(sharingGroupID: string): Promise<boolean>;
  getIsMemberOfSharingGroup(sharingGroup: SharingGroup): Promise<boolean>;
  getSharingGroupIDs(): Promise<ReadonlyArray<string>>;
  isSameUser(other: User): Promise<boolean>;
}
