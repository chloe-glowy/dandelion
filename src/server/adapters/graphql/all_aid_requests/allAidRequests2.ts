import { GraphQLRootCall } from 'src/server/adapters/graphql/aid_request_old/helpers/GraphQLRootCall';
import { GraphQLAidRequestSearchArgsAdapter } from 'src/server/adapters/graphql/all_aid_requests/adapters/GraphQLAidRequestSearchArgsAdapter';
import { GraphQLAidRequestSearchResultAdapter } from 'src/server/adapters/graphql/all_aid_requests/adapters/GraphQLAidRequestSearchResultAdapter';
import {
  GraphQLAidRequestSearchInputArgs,
  GraphQLAidRequestSearchInputType,
} from 'src/server/adapters/graphql/all_aid_requests/types/GraphQLAidRequestSearchInputTypes';
import {
  AidRequestConnectionGraphQLType,
  AidRequestConnectionType2,
} from 'src/server/adapters/graphql/all_aid_requests/types/GraphQLAidRequestSearchResponseTypes';
import { AidRequestSearchPresenter } from 'src/server/presenters/public/aid_request_search/AidRequestSearchPresenter';

type ReturnType = AidRequestConnectionType2;

export const allAidRequests2 = GraphQLRootCall.create<
  GraphQLAidRequestSearchInputType,
  ReturnType
>({
  args: GraphQLAidRequestSearchInputArgs,
  name: 'allAidRequests2',
  resolve: async (cc, args): Promise<ReturnType> => {
    const searchArgs = GraphQLAidRequestSearchArgsAdapter.fromGraphQLArgs(args);
    const result = await AidRequestSearchPresenter.execute(cc, searchArgs);
    return GraphQLAidRequestSearchResultAdapter.toGraphQLResult(result);
  },
  type: AidRequestConnectionGraphQLType,
});
