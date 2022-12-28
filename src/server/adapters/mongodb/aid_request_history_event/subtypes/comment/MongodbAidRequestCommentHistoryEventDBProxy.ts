import { MongodbAidRequestHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/db_proxy/MongodbAidRequestHistoryEventDBProxy';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestCommentHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/comment/AidRequestCommentHistoryEvent';
import { AidRequestCommentHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/comment/AidRequestCommentHistoryEventDBProxy';

export class MongodbAidRequestCommentHistoryEventDBProxy
  extends MongodbAidRequestHistoryEventDBProxy
  implements AidRequestCommentHistoryEventDBProxy
{
  public async getRawCommentContents(): Promise<string> {
    return this.event.eventSpecificData ?? '';
  }

  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestCommentHistoryEvent(cc, this);
  }
}
