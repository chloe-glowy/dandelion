import { GraphQLAidRequestProxy } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestProxy';
import { GraphQLUndoAidRequestEditResponsePayloadProperties } from 'src/server/adapters/graphql/undo_aid_request_edit/types/GraphQLUndoAidRequestEditResponseTypes';
import { UndoAidRequestEditControllerResult } from 'src/server/controllers/undo_aid_request_edit/types/UndoAidRequestEditControllerTypes';

export abstract class GraphQLUndoAidRequestEditResultAdapter {
  public static toGraphQLResult(
    result: UndoAidRequestEditControllerResult,
  ): GraphQLUndoAidRequestEditResponsePayloadProperties {
    return {
      aidRequest: new GraphQLAidRequestProxy(result.aidRequest),
    };
  }
}
