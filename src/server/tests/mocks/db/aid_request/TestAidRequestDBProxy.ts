import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestEditResponse } from 'src/server/entities/public/aid_request/mutations/AidRequestEdit';
import { AidRequestDBProxy } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBProxy';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';
import { TestAidRequestInMemoryDatabaseRow } from 'src/server/tests/mocks/db/aid_request/TestAidRequestInMemoryDatabaseRow';

export class TestAidRequestDBProxy implements AidRequestDBProxy {
  constructor(
    private readonly cc: CC,
    private row: TestAidRequestInMemoryDatabaseRow,
  ) {}

  public async getWhatIsNeeded(): Promise<string> {
    return this.row.properties.whatIsNeeded;
  }

  public async getWhoIsItFor(): Promise<string> {
    return this.row.properties.whoIsItFor;
  }

  public async getSharingGroupID(): Promise<string> {
    return this.row.properties.sharingGroup.toString();
  }

  public async getSharingGroup(): Promise<SharingGroup | null> {
    const sharingGroupID = await this.getSharingGroupID();
    return await SharingGroup.load(this.cc, sharingGroupID);
  }

  public async getWhoRecordedIt(): Promise<User | null> {
    const whoRecordedItID = this.row.properties.whoRecordedIt.toString();
    return await User.load(this.cc, whoRecordedItID);
  }

  public async getIsCompleted(): Promise<boolean> {
    return this.row.properties.completed;
  }

  public async getIsUserWorkingOn(user: User): Promise<boolean> {
    console.log('whoIsWorkingOnIt', this.row.properties.whoIsWorkingOnIt);
    const areSameUser = await Promise.all(
      this.row.properties.whoIsWorkingOnIt.map((worker) =>
        worker.isSameUser(user),
      ),
    );
    return areSameUser.some((isSameUser) => isSameUser);
  }

  public async getActivityHistory(): Promise<
    ReadonlyArray<AidRequestHistoryEvent>
  > {
    throw new Error('Not yet implemented');
  }

  public async getHistoryEvent(_id: string): Promise<AidRequestHistoryEvent> {
    throw new Error('Not yet implemented');
  }

  public async getLatestEvent(): Promise<AidRequestHistoryEvent> {
    throw new Error('Not yet implemented');
  }

  public async getDateCreated(): Promise<Date> {
    return this.row.properties.createdAt;
  }

  public async getDateLastUpdated(): Promise<Date> {
    throw new Error('Not yet implemented');
  }

  public async getWhoIsWorkingOnIt(): Promise<ReadonlyArray<User>> {
    return this.row.properties.whoIsWorkingOnIt;
  }

  public async edit(
    _action: AidRequestAction,
    _actor: User,
  ): Promise<AidRequestEditResponse> {
    throw new Error('Not yet implemented');
  }

  public async undo(_historyEventID: string, _actor: User): Promise<void> {
    throw new Error('Not yet implemented');
  }
}
