import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';

export type TestAidRequestInMemoryDatabaseRowProperties = {
  completed: boolean;
  createdAt: Date;
  history: ReadonlyArray<AidRequestAction>;
  readonly id: string;
  sharingGroup: SharingGroup;
  whatIsNeeded: string;
  whoIsItFor: string;
  whoIsWorkingOnIt: ReadonlyArray<User>;
  whoRecordedIt: User;
};

export class TestAidRequestInMemoryDatabaseRow {
  public constructor(
    public readonly properties: TestAidRequestInMemoryDatabaseRowProperties,
  ) {}
}
