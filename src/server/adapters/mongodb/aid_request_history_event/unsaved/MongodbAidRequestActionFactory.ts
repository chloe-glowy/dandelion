import { MongodbAidRequestCreatedAction } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/created/MongodbAidRequestCreatedAction';
import { MongodbAidRequestAction } from 'src/server/adapters/mongodb/aid_request_history_event/unsaved/MongodbAidRequestAction';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestCreatedAction } from 'src/server/entities/public/aid_request_action/subtypes/created/AidRequestCreatedAction';

export abstract class MongodbAidRequestActionFactory {
  public static async create(
    cc: CC,
    action: AidRequestAction,
  ): Promise<MongodbAidRequestAction> {
    if (action instanceof AidRequestCreatedAction) {
      return new MongodbAidRequestCreatedAction(cc, action);
    }
    throw new Error('Unimplemented history event type');
  }
}
