import { GraphQLAidRequestSearchInputType } from 'src/server/adapters/graphql/all_aid_requests/types/GraphQLAidRequestSearchInputTypes';
import { AidRequestSearchPresenterInputType } from 'src/server/presenters/public/aid_request_search/AidRequestSearchPresenter';

export abstract class GraphQLAidRequestSearchArgsAdapter {
  public static fromGraphQLArgs({
    filter,
    after,
    first,
  }: GraphQLAidRequestSearchInputType): AidRequestSearchPresenterInputType {
    return {
      limitToCompletedRequests: !!filter.completed,
      limitToIncompleteRequests: !filter.completed,
      limitToRequestsViewerIsNotWorkingOn: filter.iAmWorkingOnIt === false,
      limitToRequestsViewerIsWorkingOn: filter.iAmWorkingOnIt === true,
      resultCount: first,
      searchText: filter.search ?? null,
      skipFirst: Math.max(0, parseInt(after || '0')),
    };
  }
}
