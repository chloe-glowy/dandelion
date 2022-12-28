import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { User } from 'src/server/entities/public/user/User';

export interface AidRequestHistoryEventDBProxy {
  getID(): Promise<string>;
  getTimestamp(): Promise<Date>;
  getActor(): Promise<User | null>;
  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent;
}
