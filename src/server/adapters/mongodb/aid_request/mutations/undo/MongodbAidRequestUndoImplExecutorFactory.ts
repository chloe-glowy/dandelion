import { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MongodbAidRequestUndoExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/undo/MongodbAidRequestUndoExecutorContext';
import { MongodbAidRequestUndoImplExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/undo/MongodbAidRequestUndoImplExecutor';
import { MongodbAidRequestChangedWhatIsNeededUndoExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/undo/subtypes/MongodbAidRequestChangedWhatIsNeededUndoExecutor';

export abstract class MongodbAidRequestUndoImplExecutorFactory {
  public static create(
    context: MongodbAidRequestUndoExecutorContext,
    mongodbHistoryEvent: MongodbAidRequestHistoryEvent,
  ): MongodbAidRequestUndoImplExecutor {
    switch (mongodbHistoryEvent.event) {
      case 'Created':
      case 'Deleted':
        throw new Error('Cannot undo creation or deletion');
      case 'ChangedWhatIsNeeded':
        return new MongodbAidRequestChangedWhatIsNeededUndoExecutor(
          context,
          mongodbHistoryEvent,
        );
      case 'ChangedWhoIsItFor':
      case 'Comment':
      case 'Completed':
      case 'WorkingOn':
      default:
        throw new Error(
          `MongodbAidRequestUndoImplExecutorFactory -- unsupported event type -- ${mongodbHistoryEvent.event} (${mongodbHistoryEvent.action}). ID = ${mongodbHistoryEvent._id}`,
        );
    }
  }
}
