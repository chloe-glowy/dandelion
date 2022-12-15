import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';

export type AidRequestCreateArgs = Readonly<{
  completed: boolean;
  createdAt: Date;
  history: ReadonlyArray<AidRequestAction>;
  sharingGroup: SharingGroup;
  whatIsNeeded: string;
  whoIsItFor: string;
  whoIsWorkingOnIt: ReadonlyArray<User>;
  whoRecordedIt: User;
}>;
