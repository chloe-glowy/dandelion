import { GraphQLAidRequestProxy } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestProxy';
import { AidRequestConnectionType2 } from 'src/server/adapters/graphql/all_aid_requests/types/GraphQLAidRequestSearchResponseTypes';
import { AidRequestPresenter } from 'src/server/presenters/public/aid_request/AidRequestPresenter';
import { AidRequestSearchPresenterQueryResult } from 'src/server/presenters/public/aid_request_search/AidRequestSearchPresenter';

export abstract class GraphQLAidRequestSearchResultAdapter {
  public static toGraphQLResult(
    result: AidRequestSearchPresenterQueryResult,
  ): AidRequestConnectionType2 {
    return {
      edges: result.aidRequests.map((node: AidRequestPresenter) => ({
        node: new GraphQLAidRequestProxy(node),
      })),
      pageInfo: {
        endCursor: String(result.nextSkipFirst),
        hasNextPage: result.hasMore,
      },
    };
  }
}
