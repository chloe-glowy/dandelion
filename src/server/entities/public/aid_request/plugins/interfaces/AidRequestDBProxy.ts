import { AidRequestEditResponse } from 'src/server/entities/public/aid_request/mutations/AidRequestEdit';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';

export interface AidRequestDBProxy {
  getActivityHistory(): Promise<ReadonlyArray<AidRequestHistoryEvent>>;
  getHistoryEvent(id: string): Promise<AidRequestHistoryEvent>;
  getDateCreated(): Promise<Date>;
  getDateLastUpdated(): Promise<Date>;
  getIsCompleted(): Promise<boolean>;
  getIsUserWorkingOn(user: User): Promise<boolean>;
  getLatestEvent(): Promise<AidRequestHistoryEvent>;
  getSharingGroupID(): Promise<string>;
  getSharingGroup(): Promise<SharingGroup | null>;
  getWhatIsNeeded(): Promise<string>;
  getWhoIsItFor(): Promise<string>;
  getWhoRecordedIt(): Promise<User | null>;
  getWhoIsWorkingOnIt(): Promise<ReadonlyArray<User>>;
  edit(action: AidRequestAction, actor: User): Promise<AidRequestEditResponse>;
  undo(historyEventID: string, actor: User): Promise<void>;
}
