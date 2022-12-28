import { MongodbAidRequestCreatedAction } from 'src/server/adapters/mongodb/aid_request_history_event/subtypes/created/MongodbAidRequestCreatedAction';
import { MongodbAidRequestAction } from 'src/server/adapters/mongodb/aid_request_history_event/unsaved/MongodbAidRequestAction';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export abstract class MongodbAidRequestActionFactory {
  public static async create(
    cc: CC,
    action: AidRequestAction,
  ): Promise<MongodbAidRequestAction> {
    return action.handleSubtype<MongodbAidRequestAction>({
      AidRequestChangedWhatIsNeededAction: () => {
        throw new Error(
          'MongodbAidRequestActionFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestChangedWhoIsItForAction: () => {
        throw new Error(
          'MongodbAidRequestActionFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestCommentAction: () => {
        throw new Error(
          'MongodbAidRequestActionFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestCreatedAction: (action) =>
        new MongodbAidRequestCreatedAction(cc, action),
      AidRequestDeletedAction: () => {
        throw new Error(
          'MongodbAidRequestActionFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsCompletedAction: () => {
        throw new Error(
          'MongodbAidRequestActionFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsNotCompletedAction: () => {
        throw new Error(
          'MongodbAidRequestActionFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsNotWorkingOnAction: () => {
        throw new Error(
          'MongodbAidRequestActionFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
      AidRequestMarkedAsWorkingOnAction: () => {
        throw new Error(
          'MongodbAidRequestActionFactory -- Not Yet Implemented -- ' +
            action.constructor.name,
        );
      },
    });
  }
}
