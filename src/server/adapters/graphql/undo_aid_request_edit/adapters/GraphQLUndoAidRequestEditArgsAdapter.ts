import { GraphQLUndoAidRequestEditInputArgsType } from 'src/server/adapters/graphql/undo_aid_request_edit/types/GraphQLUndoAidRequestEditInputTypes';
import { UndoAidRequestEditControllerArgs } from 'src/server/controllers/undo_aid_request_edit/types/UndoAidRequestEditControllerTypes';

export abstract class GraphQLUndoAidRequestEditArgsAdapter {
  public static fromGraphQLArgs(
    args: GraphQLUndoAidRequestEditInputArgsType,
  ): UndoAidRequestEditControllerArgs {
    return args;
  }
}
