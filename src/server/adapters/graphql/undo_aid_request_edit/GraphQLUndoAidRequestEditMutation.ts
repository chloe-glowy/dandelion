import { GraphQLRootCall } from 'src/server/adapters/graphql/aid_request_old/helpers/GraphQLRootCall';
import { GraphQLUndoAidRequestEditArgsAdapter } from 'src/server/adapters/graphql/undo_aid_request_edit/adapters/GraphQLUndoAidRequestEditArgsAdapter';
import { GraphQLUndoAidRequestEditResultAdapter } from 'src/server/adapters/graphql/undo_aid_request_edit/adapters/GraphQLUndoAidRequestEditResultAdapter';
import {
  GraphQLUndoAidRequestEditInputArgs,
  GraphQLUndoAidRequestEditInputArgsType,
} from 'src/server/adapters/graphql/undo_aid_request_edit/types/GraphQLUndoAidRequestEditInputTypes';
import {
  GraphQLUndoAidRequestEditResponsePayload,
  GraphQLUndoAidRequestEditResponsePayloadProperties,
} from 'src/server/adapters/graphql/undo_aid_request_edit/types/GraphQLUndoAidRequestEditResponseTypes';
import { UndoAidRequestEditController } from 'src/server/controllers/undo_aid_request_edit/UndoAidRequestEditController';

type Args = GraphQLUndoAidRequestEditInputArgsType;
type ReturnType = GraphQLUndoAidRequestEditResponsePayloadProperties;

export const undoAidRequestEdit = GraphQLRootCall.create<Args, ReturnType>({
  args: GraphQLUndoAidRequestEditInputArgs,
  kind: 'mutation',
  name: 'undoAidRequestEdit',
  resolve: async (cc, args): Promise<ReturnType> => {
    const createAidRequestArgs =
      GraphQLUndoAidRequestEditArgsAdapter.fromGraphQLArgs(args);
    const result = await UndoAidRequestEditController.execute(
      cc,
      createAidRequestArgs,
    );
    return GraphQLUndoAidRequestEditResultAdapter.toGraphQLResult(result);
  },
  type: GraphQLUndoAidRequestEditResponsePayload,
});
