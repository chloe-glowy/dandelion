import { MongodbAidRequestEditExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditExecutorContext';
import { MongodbAidRequestEditImplReturnType } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImpl';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export abstract class MongodbAidRequestEditImplExecutor {
  protected abstract readonly context: MongodbAidRequestEditExecutorContext;
  protected abstract readonly action: AidRequestAction;

  public abstract exec(): Promise<MongodbAidRequestEditImplReturnType>;
}
