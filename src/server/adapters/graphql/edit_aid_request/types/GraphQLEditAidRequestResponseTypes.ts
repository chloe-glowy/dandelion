import { schemaComposer } from 'graphql-compose';
import { GraphQLAidRequestProxy } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestProxy';
import { AidRequestGraphQLType2 } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestTypes2';

export type GraphQLEditAidRequestResponsePayloadProperties = Readonly<{
  aidRequest: GraphQLAidRequestProxy;
  historyEventIDForUndo: string | undefined;
  postpublishSummary: string;
}>;

export const GraphQLEditAidRequestResponsePayload =
  schemaComposer.createObjectTC<GraphQLEditAidRequestResponsePayloadProperties>(
    {
      fields: {
        aidRequest: AidRequestGraphQLType2,
        historyEventIDForUndo: 'String',
        postpublishSummary: 'String!',
      },
      name: 'EditAidRequestResponsePayload',
    },
  );
