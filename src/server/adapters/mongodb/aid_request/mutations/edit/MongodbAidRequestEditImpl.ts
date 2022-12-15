import { MongodbAidRequestDBProxy } from 'src/server/adapters/mongodb/aid_request/MongodbAidRequestDBProxy';
import { MongodbAidRequestEditExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditExecutorContext';
import { MongodbAidRequestEditImplExecutorFactory } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImplExecutorFactory';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { User } from 'src/server/entities/public/user/User';

export type MongodbAidRequestEditImplReturnType = Readonly<{
  updatedAidRequest: MongodbAidRequest;
  historyEventIDForUndo: string | undefined;
}>;

export abstract class MongodbAidRequestEditImpl {
  public static async exec(
    cc: CC,
    aidRequestDBProxy: MongodbAidRequestDBProxy,
    action: AidRequestAction,
    actor: User,
    currentMongodbAidRequest: MongodbAidRequest,
  ): Promise<MongodbAidRequestEditImplReturnType> {
    const context = await MongodbAidRequestEditExecutorContext.create(
      cc,
      aidRequestDBProxy,
      actor,
      currentMongodbAidRequest,
    );

    const executor = MongodbAidRequestEditImplExecutorFactory.create(
      context,
      action,
    );
    const result = await executor.exec();

    return result;
  }
}
