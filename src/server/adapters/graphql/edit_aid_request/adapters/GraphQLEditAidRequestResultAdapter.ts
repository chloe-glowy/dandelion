import { GraphQLAidRequestProxy } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestProxy';
import { GraphQLEditAidRequestResponsePayloadProperties } from 'src/server/adapters/graphql/edit_aid_request/types/GraphQLEditAidRequestResponseTypes';
import { EditAidRequestControllerResult } from 'src/server/controllers/edit_aid_request/types/EditAidRequestControllerTypes';

export abstract class GraphQLEditAidRequestResultAdapter {
  public static toGraphQLResult({
    aidRequest,
    historyEventIDForUndo,
    postpublishSummary,
  }: EditAidRequestControllerResult): GraphQLEditAidRequestResponsePayloadProperties {
    return {
      aidRequest: new GraphQLAidRequestProxy(aidRequest),
      historyEventIDForUndo,
      postpublishSummary,
    };
  }
}
