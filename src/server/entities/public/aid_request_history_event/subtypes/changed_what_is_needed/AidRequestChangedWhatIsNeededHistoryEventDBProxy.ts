import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';

export interface AidRequestChangedWhatIsNeededHistoryEventDBProxy
  extends AidRequestHistoryEventDBProxy {
  getOldValue(): Promise<string>;
  getNewValue(): Promise<string>;
}
