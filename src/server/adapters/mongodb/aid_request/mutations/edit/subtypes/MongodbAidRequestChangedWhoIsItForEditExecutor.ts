import getHistoryUpdate from 'src/server/adapters/mongodb/aid_request/mutations/edit/helpers/getHistoryUpdate';
import updateAidRequest from 'src/server/adapters/mongodb/aid_request/mutations/edit/helpers/updateAidRequest';
import { MongodbAidRequestEditExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditExecutorContext';
import { MongodbAidRequestEditImplReturnType } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImpl';
import { MongodbAidRequestEditImplExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImplExecutor';
import { AidRequestChangedWhoIsItForAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForAction';

export class MongodbAidRequestChangedWhoIsItForEditExecutor extends MongodbAidRequestEditImplExecutor {
  public constructor(
    protected readonly context: MongodbAidRequestEditExecutorContext,
    protected readonly action: AidRequestChangedWhoIsItForAction,
  ) {
    super();
  }

  public async exec(): Promise<MongodbAidRequestEditImplReturnType> {
    const { oldValue, newValue } = this.action;

    const historyUpdate = getHistoryUpdate({
      action: 'Add',
      actor: this.context.actor,
      event: 'ChangedWhoIsItFor',
      newValue,
      oldValue,
      timestamp: this.context.timestamp,
    });

    const fieldUpdate = {
      whoIsItFor: newValue,
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
