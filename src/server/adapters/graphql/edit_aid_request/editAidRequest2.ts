import { GraphQLRootCall } from 'src/server/adapters/graphql/aid_request_old/helpers/GraphQLRootCall';
import { GraphQLEditAidRequestArgsAdapter } from 'src/server/adapters/graphql/edit_aid_request/adapters/GraphQLEditAidRequestArgsAdapter';
import { GraphQLEditAidRequestResultAdapter } from 'src/server/adapters/graphql/edit_aid_request/adapters/GraphQLEditAidRequestResultAdapter';
import {
  GraphQLEditAidRequestInputArgs,
  GraphQLEditAidRequestInputArgsType,
} from 'src/server/adapters/graphql/edit_aid_request/types/GraphQLEditAidRequestInputTypes';
import {
  GraphQLEditAidRequestResponsePayload,
  GraphQLEditAidRequestResponsePayloadProperties,
} from 'src/server/adapters/graphql/edit_aid_request/types/GraphQLEditAidRequestResponseTypes';
import { EditAidRequestController } from 'src/server/controllers/edit_aid_request/EditAidRequestController';

type Args = GraphQLEditAidRequestInputArgsType;
type ReturnType = GraphQLEditAidRequestResponsePayloadProperties;

export const editAidRequest2 = GraphQLRootCall.create<Args, ReturnType>({
  args: GraphQLEditAidRequestInputArgs,
  kind: 'mutation',
  name: 'editAidRequest2',
  resolve: async (cc, args): Promise<ReturnType> => {
    const createAidRequestArgs =
      GraphQLEditAidRequestArgsAdapter.fromGraphQLArgs(args);
    const result = await EditAidRequestController.execute(
      cc,
      createAidRequestArgs,
    );
    return GraphQLEditAidRequestResultAdapter.toGraphQLResult(result);
  },
  type: GraphQLEditAidRequestResponsePayload,
});
