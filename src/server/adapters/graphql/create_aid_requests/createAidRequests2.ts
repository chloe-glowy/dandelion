import { GraphQLRootCall } from 'src/server/adapters/graphql/aid_request_old/helpers/GraphQLRootCall';
import { GraphQLCreateAidRequestsArgsAdapter } from 'src/server/adapters/graphql/create_aid_requests/adapters/GraphQLCreateAidRequestsArgsAdapter';
import { GraphQLCreateAidRequestsResultAdapter } from 'src/server/adapters/graphql/create_aid_requests/adapters/GraphQLCreateAidRequestsResultAdapter';
import {
  GraphQLCreateAidRequestInputArgs,
  GraphQLCreateAidRequestInputArgsType,
} from 'src/server/adapters/graphql/create_aid_requests/types/GraphQLCreateAidRequestInputTypes';
import {
  GraphQLCreateAidRequestsResponsePayload,
  GraphQLCreateAidRequestsResponsePayloadProperties,
} from 'src/server/adapters/graphql/create_aid_requests/types/GraphQLCreateAidRequestResponseTypes';
import { CreateAidRequestsController } from 'src/server/controllers/create_aid_requests/CreateAidRequestsController';

type Args = GraphQLCreateAidRequestInputArgsType;
type ReturnType = GraphQLCreateAidRequestsResponsePayloadProperties;

export const createAidRequests2 = GraphQLRootCall.create<Args, ReturnType>({
  args: GraphQLCreateAidRequestInputArgs,
  kind: 'mutation',
  name: 'createAidRequests2',
  resolve: async (cc, args): Promise<ReturnType> => {
    const createAidRequestsArgs =
      GraphQLCreateAidRequestsArgsAdapter.fromGraphQLArgs(args);
    const result = await CreateAidRequestsController.execute(
      cc,
      createAidRequestsArgs,
    );
    return GraphQLCreateAidRequestsResultAdapter.toGraphQLResult(result);
  },
  type: GraphQLCreateAidRequestsResponsePayload,
});
