import { MongodbAidRequestDBProxy } from 'src/server/adapters/mongodb/aid_request/MongodbAidRequestDBProxy';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';
import { CC } from 'src/server/context_container/public/ContextContainer';

export class MongodbAidRequestUndoExecutorContext {
  public static async create(
    cc: CC,
    aidRequestDBProxy: MongodbAidRequestDBProxy,
    currentMongodbAidRequest: MongodbAidRequest,
    historyEventID: string,
  ): Promise<MongodbAidRequestUndoExecutorContext> {
    const aidRequestID = currentMongodbAidRequest._id.toString();
    return new MongodbAidRequestUndoExecutorContext(
      cc,
      aidRequestDBProxy,
      aidRequestID,
      historyEventID,
    );
  }

  private constructor(
    public readonly cc: CC,
    public readonly aidRequestDBProxy: MongodbAidRequestDBProxy,
    public readonly aidRequestID: string,
    public readonly historyEventID: string,
  ) {}
}
