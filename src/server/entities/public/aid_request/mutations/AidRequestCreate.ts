import { AidRequestActionWithContext } from 'src/server/entities/public/aid_request_action_with_context/AidRequestActionWithContext';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';

export type AidRequestCreateArgs = Readonly<{
  completed: boolean;
  createdAt: Date;
  history: ReadonlyArray<AidRequestActionWithContext>;
  sharingGroup: SharingGroup;
  whatIsNeeded: string;
  whoIsItFor: string;
  whoIsWorkingOnIt: ReadonlyArray<User>;
  whoRecordedIt: User;
}>;
