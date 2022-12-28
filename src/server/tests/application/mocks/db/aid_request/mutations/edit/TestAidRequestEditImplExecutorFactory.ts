import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { TestAidRequestChangedWhatIsNeededEditExecutor } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/subtypes/TestAidRequestChangedWhatIsNeededEditExecutor';
import { TestAidRequestEditExecutorContext } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/TestAidRequestEditExecutorContext';
import { TestAidRequestEditImplExecutor } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/TestAidRequestEditImplExecutor';

export abstract class TestAidRequestEditImplExecutorFactory {
  public static create(
    context: TestAidRequestEditExecutorContext,
    action: AidRequestAction,
  ): TestAidRequestEditImplExecutor {
    return action.handleSubtype<TestAidRequestEditImplExecutor>({
      AidRequestChangedWhatIsNeededAction: (action) =>
        new TestAidRequestChangedWhatIsNeededEditExecutor(context, action),
      AidRequestChangedWhoIsItForAction: () => {
        throw new Error(
          'TestAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestCommentAction: () => {
        throw new Error(
          'TestAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestCreatedAction: () => {
        throw new Error(
          'TestAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestDeletedAction: () => {
        throw new Error(
          'TestAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsCompletedAction: () => {
        throw new Error(
          'TestAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsNotCompletedAction: () => {
        throw new Error(
          'TestAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsNotWorkingOnAction: () => {
        throw new Error(
          'TestAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsWorkingOnAction: () => {
        throw new Error(
          'TestAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
    });
  }
}
