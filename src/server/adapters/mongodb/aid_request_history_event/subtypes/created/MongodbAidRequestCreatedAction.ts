import {
  AidRequestActionType,
  AidRequestHistoryEventType,
} from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MongodbAidRequestAction } from 'src/server/adapters/mongodb/aid_request_history_event/unsaved/MongodbAidRequestAction';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestCreatedAction } from 'src/server/entities/public/aid_request_action/subtypes/created/AidRequestCreatedAction';

export class MongodbAidRequestCreatedAction extends MongodbAidRequestAction {
  constructor(
    protected readonly cc: CC,
    protected readonly action: AidRequestCreatedAction,
  ) {
    super();
  }

  public async getAction(): Promise<AidRequestActionType> {
    return 'Add';
  }

  public async getEvent(): Promise<AidRequestHistoryEventType> {
    return 'Created';
  }

  public async getEventSpecificData(): Promise<string | undefined> {
    return undefined;
  }

  public async getNewValue(): Promise<string | undefined> {
    return undefined;
  }

  public async getOldValue(): Promise<string | undefined> {
    return undefined;
  }
}
