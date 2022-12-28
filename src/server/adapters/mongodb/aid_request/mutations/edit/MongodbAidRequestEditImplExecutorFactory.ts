import { MongodbAidRequestEditExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditExecutorContext';
import { MongodbAidRequestEditImplExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImplExecutor';
import { MongodbAidRequestChangedWhatIsNeededEditExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/subtypes/MongodbAidRequestChangedWhatIsNeededEditExecutor';
import { MongodbAidRequestChangedWhoIsItForEditExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/subtypes/MongodbAidRequestChangedWhoIsItForEditExecutor';
import { MongodbAidRequestCommentEditExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/subtypes/MongodbAidRequestCommentEditExecutor';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export abstract class MongodbAidRequestEditImplExecutorFactory {
  public static create(
    context: MongodbAidRequestEditExecutorContext,
    action: AidRequestAction,
  ): MongodbAidRequestEditImplExecutor {
    return action.handleSubtype<MongodbAidRequestEditImplExecutor>({
      AidRequestChangedWhatIsNeededAction: (action) =>
        new MongodbAidRequestChangedWhatIsNeededEditExecutor(context, action),
      AidRequestChangedWhoIsItForAction: (action) =>
        new MongodbAidRequestChangedWhoIsItForEditExecutor(context, action),
      AidRequestCommentAction: (action) =>
        new MongodbAidRequestCommentEditExecutor(context, action),
      AidRequestCreatedAction: () => {
        throw new Error(
          'MongodbAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestDeletedAction: () => {
        throw new Error(
          'MongodbAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsCompletedAction: () => {
        throw new Error(
          'MongodbAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsNotCompletedAction: () => {
        throw new Error(
          'MongodbAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsNotWorkingOnAction: () => {
        throw new Error(
          'MongodbAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsWorkingOnAction: () => {
        throw new Error(
          'MongodbAidRequestEditImplExecutorFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
    });
  }
}
