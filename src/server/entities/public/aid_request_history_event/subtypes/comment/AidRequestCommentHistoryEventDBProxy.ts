import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';

export interface AidRequestCommentHistoryEventDBProxy
  extends AidRequestHistoryEventDBProxy {
  getRawCommentContents(): Promise<string>;
}
