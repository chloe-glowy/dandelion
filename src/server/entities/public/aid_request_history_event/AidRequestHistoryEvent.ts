import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { User } from 'src/server/entities/public/user/User';

export abstract class AidRequestHistoryEvent {
  public abstract readonly cc: CC;
  protected abstract readonly dbProxy: AidRequestHistoryEventDBProxy;

  public async getID(): Promise<string> {
    return await this.dbProxy.getID();
  }

  public async getTimestamp(): Promise<Date> {
    return await this.dbProxy.getTimestamp();
  }

  public async getActor(): Promise<User | null> {
    return await this.dbProxy.getActor();
  }

  public abstract supportsUndo(): Promise<boolean>;
}
