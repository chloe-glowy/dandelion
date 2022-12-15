import {
  GraphQLAidRequestActionInputType,
  GraphQLEditAidRequestInputArgsType,
} from 'src/server/adapters/graphql/edit_aid_request/types/GraphQLEditAidRequestInputTypes';
import { EditAidRequestControllerArgs } from 'src/server/controllers/edit_aid_request/types/EditAidRequestControllerTypes';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';
import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';
import { AidRequestChangedWhoIsItForAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForAction';
import { AidRequestCommentAction } from 'src/server/entities/public/aid_request_action/subtypes/comment/AidRequestCommentAction';

export abstract class GraphQLEditAidRequestArgsAdapter {
  public static fromGraphQLArgs({
    aidRequestID,
    action: graphQLAction,
  }: GraphQLEditAidRequestInputArgsType): EditAidRequestControllerArgs {
    const action = this.getAction(graphQLAction);
    return {
      action,
      aidRequestID,
    };
  }

  private static getAction(
    action: GraphQLAidRequestActionInputType,
  ): AidRequestAction {
    const { actionType, addOrRemove, commentValue, newValue, oldValue } =
      action;
    addOrRemove;
    switch (actionType) {
      case 'ChangedWhoIsItFor':
        return (() => {
          if (oldValue == null) {
            throw new Error('oldValue is required');
          }
          if (newValue == null) {
            throw new Error('newValue is required');
          }
          return new AidRequestChangedWhoIsItForAction(oldValue, newValue);
        })();
      case 'ChangedWhatIsNeeded':
        return (() => {
          if (oldValue == null) {
            throw new Error('oldValue is required');
          }
          if (newValue == null) {
            throw new Error('newValue is required');
          }
          return new AidRequestChangedWhatIsNeededAction(oldValue, newValue);
        })();
      case 'Comment':
        return (() => {
          if (commentValue == null) {
            throw new Error('commentValue is required');
          }
          return new AidRequestCommentAction(commentValue);
        })();
      case 'Completed':
        return (() => {
          throw new Error(
            'GraphQLEditAidRequestArgsAdapter -- Completed -- not yet implemented',
          );
        })();
      case 'Created':
        return (() => {
          throw new Error(
            'GraphQLEditAidRequestArgsAdapter -- Created -- not yet implemented',
          );
        })();
      case 'Deleted':
        return (() => {
          throw new Error(
            'GraphQLEditAidRequestArgsAdapter -- Deleted -- not yet implemented',
          );
        })();
      case 'WorkingOn':
        return (() => {
          throw new Error(
            'GraphQLEditAidRequestArgsAdapter -- WorkingOn -- not yet implemented',
          );
        })();
    }
  }
}
