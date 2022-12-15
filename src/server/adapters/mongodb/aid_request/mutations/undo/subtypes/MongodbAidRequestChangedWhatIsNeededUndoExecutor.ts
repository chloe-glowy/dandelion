import { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import updateAidRequest from 'src/server/adapters/mongodb/aid_request/mutations/edit/helpers/updateAidRequest';
import getHistoryUpdateForUndo from 'src/server/adapters/mongodb/aid_request/mutations/undo/helpers/getHistoryUpdateForUndo';
import { MongodbAidRequestUndoExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/undo/MongodbAidRequestUndoExecutorContext';
import { MongodbAidRequestUndoImplReturnType } from 'src/server/adapters/mongodb/aid_request/mutations/undo/MongodbAidRequestUndoImpl';
import { MongodbAidRequestUndoImplExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/undo/MongodbAidRequestUndoImplExecutor';

export class MongodbAidRequestChangedWhatIsNeededUndoExecutor extends MongodbAidRequestUndoImplExecutor {
  public constructor(
    protected readonly context: MongodbAidRequestUndoExecutorContext,
    protected readonly mongodbHistoryEvent: MongodbAidRequestHistoryEvent,
  ) {
    super();
  }

  public async exec(): Promise<MongodbAidRequestUndoImplReturnType> {
    const historyUpdate = getHistoryUpdateForUndo(this.context.historyEventID);

    const fieldUpdate = {
      whatIsNeeded: this.mongodbHistoryEvent.oldValue,
    };

    const update = {
      ...historyUpdate,
      ...fieldUpdate,
    };

    const edited = await updateAidRequest(this.context.aidRequestID, update, {
      supportsUndo: false,
    });
    return {
      updatedAidRequest: edited.updatedAidRequest,
    };
  }
}
