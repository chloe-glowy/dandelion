import { MongodbAidRequestHistoryEventDBProxy } from 'src/server/adapters/mongodb/aid_request_history_event/db_proxy/MongodbAidRequestHistoryEventDBProxy';
import { AidRequestCommentHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/comment/AidRequestCommentHistoryEventDBProxy';

export class MongodbAidRequestCommentHistoryEventDBProxy
  extends MongodbAidRequestHistoryEventDBProxy
  implements AidRequestCommentHistoryEventDBProxy
{
  public async getRawCommentContents(): Promise<string> {
    return this.event.eventSpecificData ?? '';
  }
}
