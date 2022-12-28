import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { TestAidRequestEditExecutorContext } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/TestAidRequestEditExecutorContext';
import { TestAidRequestEditImplReturnType } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/TestAidRequestEditImpl';

export abstract class TestAidRequestEditImplExecutor {
  protected abstract readonly context: TestAidRequestEditExecutorContext;
  protected abstract readonly action: AidRequestAction;

  public abstract exec(): Promise<TestAidRequestEditImplReturnType>;
}
