import { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { User } from 'src/server/entities/public/user/User';

export class MongodbAidRequestHistoryEventDBProxy
  implements AidRequestHistoryEventDBProxy
{
  constructor(
    private readonly cc: CC,
    protected readonly event: MongodbAidRequestHistoryEvent,
  ) {}

  public async getID(): Promise<string> {
    return this.event._id ?? '';
  }
  public async getTimestamp(): Promise<Date> {
    return this.event.timestamp;
  }
  public async getActor(): Promise<User | null> {
    const actorID = this.event.actor.toString();
    return await User.load(this.cc, actorID);
  }
}
