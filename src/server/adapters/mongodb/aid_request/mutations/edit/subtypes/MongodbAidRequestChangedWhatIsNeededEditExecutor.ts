import getHistoryUpdate from 'src/server/adapters/mongodb/aid_request/mutations/edit/helpers/getHistoryUpdate';
import updateAidRequest from 'src/server/adapters/mongodb/aid_request/mutations/edit/helpers/updateAidRequest';
import { MongodbAidRequestEditExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditExecutorContext';
import { MongodbAidRequestEditImplReturnType } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImpl';
import { MongodbAidRequestEditImplExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImplExecutor';
import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';

export class MongodbAidRequestChangedWhatIsNeededEditExecutor extends MongodbAidRequestEditImplExecutor {
  public constructor(
    protected readonly context: MongodbAidRequestEditExecutorContext,
    protected readonly action: AidRequestChangedWhatIsNeededAction,
  ) {
    super();
  }

  public async exec(): Promise<MongodbAidRequestEditImplReturnType> {
    const { oldValue, newValue } = this.action;

    const historyUpdate = getHistoryUpdate({
      action: 'Add',
      actor: this.context.actor,
      event: 'ChangedWhatIsNeeded',
      newValue,
      oldValue,
      timestamp: this.context.timestamp,
    });

    const fieldUpdate = {
      whatIsNeeded: newValue,
    };

    const update = {
      ...historyUpdate,
      ...fieldUpdate,
    };

    return await updateAidRequest(this.context.aidRequestID, update, {
      supportsUndo: true,
    });
  }
}
