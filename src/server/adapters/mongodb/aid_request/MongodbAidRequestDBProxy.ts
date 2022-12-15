import { ObjectId } from 'mongodb';
import { MongodbAidRequestEditImpl } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImpl';
import { MongodbAidRequestUndoImpl } from 'src/server/adapters/mongodb/aid_request/mutations/undo/MongodbAidRequestUndoImpl';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';
import { MongodbAidRequestHistoryEventDBProxyFactory } from 'src/server/adapters/mongodb/aid_request_history_event/db_proxy/MongodbAidRequestHistoryEventDBProxyFactory';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestEditResponse } from 'src/server/entities/public/aid_request/mutations/AidRequestEdit';
import { AidRequestDBProxy } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBProxy';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';
import filterNulls from 'src/shared/language_utils/filterNulls';

export class MongodbAidRequestDBProxy implements AidRequestDBProxy {
  constructor(
    private readonly cc: CC,
    private mongodbAidRequest: MongodbAidRequest,
  ) {}

  public async getWhatIsNeeded(): Promise<string> {
    return this.mongodbAidRequest.whatIsNeeded;
  }

  public async getWhoIsItFor(): Promise<string> {
    return this.mongodbAidRequest.whoIsItFor;
  }

  public async getSharingGroupID(): Promise<string> {
    return this.mongodbAidRequest.sharingGroup.toString();
  }

  public async getSharingGroup(): Promise<SharingGroup | null> {
    const sharingGroupID = await this.getSharingGroupID();
    return await SharingGroup.load(this.cc, sharingGroupID);
  }

  public async getWhoRecordedIt(): Promise<User | null> {
    const whoRecordedItID = this.mongodbAidRequest.whoRecordedIt.toString();
    return await User.load(this.cc, whoRecordedItID);
  }

  public async getIsCompleted(): Promise<boolean> {
    return this.mongodbAidRequest.completed;
  }

  public async getIsUserWorkingOn(user: User): Promise<boolean> {
    const userID = await user.getID();
    console.log('whoIsWorkingOnIt', this.mongodbAidRequest.whoIsWorkingOnIt);
    return this.mongodbAidRequest.whoIsWorkingOnIt.some((id) =>
      id.equals(new ObjectId(userID)),
    );
  }

  public async getActivityHistory(): Promise<
    ReadonlyArray<AidRequestHistoryEvent>
  > {
    return this.mongodbAidRequest.history.map((event) =>
      MongodbAidRequestHistoryEventDBProxyFactory.create(this.cc, event),
    );
  }

  public async getHistoryEvent(id: string): Promise<AidRequestHistoryEvent> {
    const historyEvent = this.mongodbAidRequest.history.find(
      (event) => event._id?.toString() === id,
    );
    if (!historyEvent) {
      throw new Error('History event not found');
    }
    return MongodbAidRequestHistoryEventDBProxyFactory.create(
      this.cc,
      historyEvent,
    );
  }

  public async getLatestEvent(): Promise<AidRequestHistoryEvent> {
    const history = this.mongodbAidRequest.history;
    if (history.length === 0) {
      throw new Error('Unexpected zero-length history');
    }

    const latestEvent = history.reduce((latestEvent, currentEvent) =>
      currentEvent.timestamp > latestEvent.timestamp
        ? currentEvent
        : latestEvent,
    );
    return MongodbAidRequestHistoryEventDBProxyFactory.create(
      this.cc,
      latestEvent,
    );
  }

  public async getDateCreated(): Promise<Date> {
    return this.mongodbAidRequest.createdAt;
  }

  public async getDateLastUpdated(): Promise<Date> {
    return this.mongodbAidRequest.lastUpdated;
  }

  public async getWhoIsWorkingOnIt(): Promise<ReadonlyArray<User>> {
    return filterNulls(
      await Promise.all(
        this.mongodbAidRequest.whoIsWorkingOnIt.map((id) =>
          User.load(this.cc, id.toString()),
        ),
      ),
    );
  }

  public async edit(
    action: AidRequestAction,
    actor: User,
  ): Promise<AidRequestEditResponse> {
    const { updatedAidRequest, historyEventIDForUndo } =
      await MongodbAidRequestEditImpl.exec(
        this.cc,
        this,
        action,
        actor,
        this.mongodbAidRequest,
      );
    this.mongodbAidRequest = updatedAidRequest;
    return {
      historyEventIDForUndo,
    };
  }

  public async undo(historyEventID: string, _actor: User): Promise<void> {
    const { updatedAidRequest } = await MongodbAidRequestUndoImpl.exec(
      this.cc,
      this,
      historyEventID,
      this.mongodbAidRequest,
    );
    this.mongodbAidRequest = updatedAidRequest;
  }
}
