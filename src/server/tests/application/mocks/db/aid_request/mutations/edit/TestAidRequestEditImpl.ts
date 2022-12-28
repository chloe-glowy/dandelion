import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { User } from 'src/server/entities/public/user/User';
import { TestAidRequestEditExecutorContext } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/TestAidRequestEditExecutorContext';
import { TestAidRequestEditImplExecutorFactory } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/TestAidRequestEditImplExecutorFactory';
import { TestAidRequestDBProxy } from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestDBProxy';
import { TestAidRequestInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestInMemoryDatabaseRow';

export type TestAidRequestEditImplReturnType = Readonly<{
  historyEventIDForUndo: string | undefined;
}>;

export abstract class TestAidRequestEditImpl {
  public static async exec(
    cc: CC,
    aidRequestDBProxy: TestAidRequestDBProxy,
    action: AidRequestAction,
    actor: User,
    currentRow: TestAidRequestInMemoryDatabaseRow,
  ): Promise<TestAidRequestEditImplReturnType> {
    const context = await TestAidRequestEditExecutorContext.create(
      cc,
      aidRequestDBProxy,
      actor,
      currentRow,
    );

    const executor = TestAidRequestEditImplExecutorFactory.create(
      context,
      action,
    );
    const result = await executor.exec();

    return result;
  }
}
