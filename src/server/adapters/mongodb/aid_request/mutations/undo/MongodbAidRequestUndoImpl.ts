import { MongodbAidRequestDBProxy } from 'src/server/adapters/mongodb/aid_request/MongodbAidRequestDBProxy';
import { MongodbAidRequestUndoExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/undo/MongodbAidRequestUndoExecutorContext';
import { MongodbAidRequestUndoImplExecutorFactory } from 'src/server/adapters/mongodb/aid_request/mutations/undo/MongodbAidRequestUndoImplExecutorFactory';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';
import { CC } from 'src/server/context_container/public/ContextContainer';

export type MongodbAidRequestUndoImplReturnType = Readonly<{
  updatedAidRequest: MongodbAidRequest;
}>;

export abstract class MongodbAidRequestUndoImpl {
  public static async exec(
    cc: CC,
    aidRequestDBProxy: MongodbAidRequestDBProxy,
    historyEventID: string,
    currentMongodbAidRequest: MongodbAidRequest,
  ): Promise<MongodbAidRequestUndoImplReturnType> {
    const historyEvent = currentMongodbAidRequest.history.find(
      (event) => event._id?.toString() === historyEventID,
    );
    if (historyEvent == null) {
      throw new Error('History event not found');
    }
    const context = await MongodbAidRequestUndoExecutorContext.create(
      cc,
      aidRequestDBProxy,
      currentMongodbAidRequest,
      historyEventID,
    );

    const executor = MongodbAidRequestUndoImplExecutorFactory.create(
      context,
      historyEvent,
    );
    const result = await executor.exec();
    return result;
  }
}
