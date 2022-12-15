import { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MongodbAidRequestUndoExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/undo/MongodbAidRequestUndoExecutorContext';
import { MongodbAidRequestUndoImplReturnType } from 'src/server/adapters/mongodb/aid_request/mutations/undo/MongodbAidRequestUndoImpl';

export abstract class MongodbAidRequestUndoImplExecutor {
  protected abstract readonly context: MongodbAidRequestUndoExecutorContext;
  protected abstract readonly mongodbHistoryEvent: MongodbAidRequestHistoryEvent;

  public abstract exec(): Promise<MongodbAidRequestUndoImplReturnType>;
}
