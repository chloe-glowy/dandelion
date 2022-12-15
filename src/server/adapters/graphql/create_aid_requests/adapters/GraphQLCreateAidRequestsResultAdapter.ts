import { GraphQLAidRequestProxy } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestProxy';
import { GraphQLCreateAidRequestsResponsePayloadProperties } from 'src/server/adapters/graphql/create_aid_requests/types/GraphQLCreateAidRequestResponseTypes';
import { CreateAidRequestsControllerResult } from 'src/server/controllers/create_aid_requests/types/CreateAidRequestsControllerTypes';

export abstract class GraphQLCreateAidRequestsResultAdapter {
  public static toGraphQLResult({
    aidRequests,
    postpublishSummary,
  }: CreateAidRequestsControllerResult): GraphQLCreateAidRequestsResponsePayloadProperties {
    return {
      aidRequests: aidRequests.map(
        (aidRequest) => new GraphQLAidRequestProxy(aidRequest),
      ),
      postpublishSummary,
    };
  }
}
