import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestEditResponse } from 'src/server/entities/public/aid_request/mutations/AidRequestEdit';
import { AidRequestDBProxy } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBProxy';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestCreatedHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/created/AidRequestCreatedHistoryEvent';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';
import { TestAidRequestEditImpl } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/TestAidRequestEditImpl';
import { TestAidRequestInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestInMemoryDatabaseRow';
import filterNulls from 'src/shared/language_utils/filterNulls';

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
    return this.row.properties.sharingGroupID;
  }

  public async getSharingGroup(): Promise<SharingGroup | null> {
    const sharingGroupID = await this.getSharingGroupID();
    return await SharingGroup.load(this.cc, sharingGroupID);
  }

  public async getWhoRecordedIt(): Promise<User | null> {
    return await User.load(this.cc, this.row.properties.whoRecordedItUserID);
  }

  public async getIsCompleted(): Promise<boolean> {
    return this.row.properties.completed;
  }

  public async getIsUserWorkingOn(user: User): Promise<boolean> {
    const userID = await user.getID();
    return this.row.properties.whoIsWorkingOnItUserIDs.includes(userID);
  }

  public async getActivityHistory(): Promise<
    ReadonlyArray<AidRequestHistoryEvent>
  > {
    return this.row.properties.history.map((event) =>
      event.asAidRequestHistoryEvent(this.cc),
    );
  }

  public async getHistoryEvent(id: string): Promise<AidRequestHistoryEvent> {
    const eventsAndIDs = await Promise.all(
      this.row.properties.history.map(async (event) => {
        const id = await event.getID();
        return {
          event,
          id,
        };
      }),
    );
    const matching = eventsAndIDs.find((eventAndID) => eventAndID.id === id);
    if (matching === undefined) {
      throw new Error(`No event with ID ${id} found`);
    }
    return matching.event.asAidRequestHistoryEvent(this.cc);
  }

  public async getLatestEvent(): Promise<AidRequestHistoryEvent> {
    const eventsAndTimes = await Promise.all(
      this.row.properties.history.map(async (event) => {
        const timestamp = await event.getTimestamp();
        return {
          event,
          timestamp,
        };
      }),
    );
    if (eventsAndTimes.length === 0) {
      throw new Error('No events found');
    }
    const latest = eventsAndTimes.reduce((latest, eventAndTime) => {
      if (eventAndTime.timestamp > latest.timestamp) {
        return eventAndTime;
      }
      return latest;
    }, eventsAndTimes[0]);
    return latest.event.asAidRequestHistoryEvent(this.cc);
  }

  public async getDateCreated(): Promise<Date> {
    const creationEvent = this.row.properties.history.find(
      (event) => event instanceof AidRequestCreatedHistoryEvent,
    );
    if (creationEvent === undefined) {
      throw new Error('No creation event found');
    }
    return await creationEvent.getTimestamp();
  }

  public async getDateLastUpdated(): Promise<Date> {
    const latestEvent = await this.getLatestEvent();
    return await latestEvent.getTimestamp();
  }

  public async getWhoIsWorkingOnIt(): Promise<ReadonlyArray<User>> {
    return filterNulls(
      await Promise.all(
        this.row.properties.whoIsWorkingOnItUserIDs.map(
          async (userID) => await User.load(this.cc, userID),
        ),
      ),
    );
  }

  public async edit(
    action: AidRequestAction,
    actor: User,
  ): Promise<AidRequestEditResponse> {
    const { historyEventIDForUndo } = await TestAidRequestEditImpl.exec(
      this.cc,
      this,
      action,
      actor,
      this.row,
    );
    return {
      historyEventIDForUndo,
    };
  }

  public async undo(_historyEventID: string, _actor: User): Promise<void> {
    throw new Error('Not yet implemented');
  }
}
