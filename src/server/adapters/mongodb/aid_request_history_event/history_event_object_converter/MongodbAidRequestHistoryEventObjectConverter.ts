import { ObjectId } from 'mongodb';
import { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MongodbAidRequestActionFactory } from 'src/server/adapters/mongodb/aid_request_history_event/unsaved/MongodbAidRequestActionFactory';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { User } from 'src/server/entities/public/user/User';

export abstract class MongodbAidRequestHistoryEventObjectConverter {
  public static async create(
    cc: CC,
    action: AidRequestAction,
    whoRecordedIt: User,
  ): Promise<MongodbAidRequestHistoryEvent> {
    const mongodbHistoryEvent = await MongodbAidRequestActionFactory.create(
      cc,
      action,
    );
    const timestamp = new Date();
    const actor = new ObjectId(await whoRecordedIt.getID());

    const [mongodbAction, event, eventSpecificData, newValue, oldValue] =
      await Promise.all([
        mongodbHistoryEvent.getAction(),
        mongodbHistoryEvent.getEvent(),
        mongodbHistoryEvent.getEventSpecificData(),
        mongodbHistoryEvent.getNewValue(),
        mongodbHistoryEvent.getOldValue(),
      ]);

    return {
      action: mongodbAction,
      actor,
      event,
      eventSpecificData,
      newValue,
      oldValue,
      timestamp,
      undoID: null,
    };
  }
}
