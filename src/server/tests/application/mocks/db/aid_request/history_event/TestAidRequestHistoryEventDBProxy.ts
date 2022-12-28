import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { User } from 'src/server/entities/public/user/User';

export type TestAidRequestHistoryEventDBProxySharedProperties = Readonly<{
  id: string;
  timestamp: Date;
  actorID: string;
}>;

export abstract class TestAidRequestHistoryEventDBProxy
  implements AidRequestHistoryEventDBProxy
{
  constructor(
    protected readonly cc: CC,
    protected readonly sharedProperties: TestAidRequestHistoryEventDBProxySharedProperties,
  ) {}

  public async getID(): Promise<string> {
    return this.sharedProperties.id;
  }
  public async getTimestamp(): Promise<Date> {
    return this.sharedProperties.timestamp;
  }
  public async getActor(): Promise<User | null> {
    return await User.load(this.cc, this.sharedProperties.actorID);
  }

  abstract asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent;
}
