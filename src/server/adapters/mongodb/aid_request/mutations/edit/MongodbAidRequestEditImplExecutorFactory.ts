import { MongodbAidRequestEditExecutorContext } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditExecutorContext';
import { MongodbAidRequestEditImplExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImplExecutor';
import { MongodbAidRequestChangedWhatIsNeededEditExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/subtypes/MongodbAidRequestChangedWhatIsNeededEditExecutor';
import { MongodbAidRequestChangedWhoIsItForEditExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/subtypes/MongodbAidRequestChangedWhoIsItForEditExecutor';
import { MongodbAidRequestCommentEditExecutor } from 'src/server/adapters/mongodb/aid_request/mutations/edit/subtypes/MongodbAidRequestCommentEditExecutor';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';
import { AidRequestChangedWhoIsItForAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForAction';
import { AidRequestCommentAction } from 'src/server/entities/public/aid_request_action/subtypes/comment/AidRequestCommentAction';

export abstract class MongodbAidRequestEditImplExecutorFactory {
  public static create(
    context: MongodbAidRequestEditExecutorContext,
    action: AidRequestAction,
  ): MongodbAidRequestEditImplExecutor {
    if (action instanceof AidRequestChangedWhatIsNeededAction) {
      return new MongodbAidRequestChangedWhatIsNeededEditExecutor(
        context,
        action,
      );
    }
    if (action instanceof AidRequestChangedWhoIsItForAction) {
      return new MongodbAidRequestChangedWhoIsItForEditExecutor(
        context,
        action,
      );
    }
    if (action instanceof AidRequestCommentAction) {
      return new MongodbAidRequestCommentEditExecutor(context, action);
    }
    throw new Error(
      'MongodbAidRequestEditImplExecutorFactory -- Unhandled action type -- ' +
        action.constructor.name,
    );
  }
}
