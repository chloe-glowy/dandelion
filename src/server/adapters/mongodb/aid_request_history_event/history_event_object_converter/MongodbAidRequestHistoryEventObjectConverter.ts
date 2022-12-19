import { ObjectId } from 'mongodb';
import { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MongodbAidRequestActionFactory } from 'src/server/adapters/mongodb/aid_request_history_event/unsaved/MongodbAidRequestActionFactory';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestActionWithContext } from 'src/server/entities/public/aid_request_action_with_context/AidRequestActionWithContext';

export abstract class MongodbAidRequestHistoryEventObjectConverter {
  public static async create(
    cc: CC,
    { action, actorID, timestamp }: AidRequestActionWithContext,
  ): Promise<MongodbAidRequestHistoryEvent> {
    const mongodbHistoryEvent = await MongodbAidRequestActionFactory.create(
      cc,
      action,
    );
    const actor = new ObjectId(actorID);

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
