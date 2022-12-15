import getHistoryUpdate from 'src/server/adapters/mongodb/aid_request/mutations/edit/helpers/getHistoryUpdate';
import updateAidRequest from 'src/server/adapters/mongodb/aid_request/mutations/edit/helpers/updateAidRequest';
import { MongodbAidRequestEditExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditExecutorContext';
import { MongodbAidRequestEditImplReturnType } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImpl';
import { MongodbAidRequestEditImplExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImplExecutor';
import { AidRequestCommentAction } from 'src/server/entities/public/aid_request_action/subtypes/comment/AidRequestCommentAction';

export class MongodbAidRequestCommentEditExecutor extends MongodbAidRequestEditImplExecutor {
  public constructor(
    protected readonly context: MongodbAidRequestEditExecutorContext,
    protected readonly action: AidRequestCommentAction,
  ) {
    super();
  }

  public async exec(): Promise<MongodbAidRequestEditImplReturnType> {
    const { commentValue } = this.action;

    const historyUpdate = getHistoryUpdate({
      action: 'Add',
      actor: this.context.actor,
      event: 'Comment',
      eventSpecificData: commentValue,
      timestamp: this.context.timestamp,
    });

    return await updateAidRequest(this.context.aidRequestID, historyUpdate, {
      supportsUndo: true,
    });
  }
}
