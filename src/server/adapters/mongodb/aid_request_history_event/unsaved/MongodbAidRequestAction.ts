import {
  AidRequestActionType,
  AidRequestHistoryEventType,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export abstract class MongodbAidRequestAction {
  protected abstract readonly cc: CC;
  protected abstract readonly action: AidRequestAction;

  public abstract getAction(): Promise<AidRequestActionType>;
  public abstract getEvent(): Promise<AidRequestHistoryEventType>;
  public abstract getEventSpecificData(): Promise<string | undefined>;
  public abstract getNewValue(): Promise<string | undefined>;
  public abstract getOldValue(): Promise<string | undefined>;
}
