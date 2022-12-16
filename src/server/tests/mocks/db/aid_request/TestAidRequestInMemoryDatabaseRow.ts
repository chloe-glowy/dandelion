import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';

export type TestAidRequestInMemoryDatabaseRowProperties = {
  completed: boolean;
  history: ReadonlyArray<AidRequestHistoryEventDBProxy>;
  readonly id: string;
  sharingGroupID: string;
  whatIsNeeded: string;
  whoIsItFor: string;
  whoIsWorkingOnItUserIDs: ReadonlyArray<string>;
  whoRecordedItUserID: string;
};

export class TestAidRequestInMemoryDatabaseRow {
  public constructor(
    public readonly properties: TestAidRequestInMemoryDatabaseRowProperties,
  ) {}
}
