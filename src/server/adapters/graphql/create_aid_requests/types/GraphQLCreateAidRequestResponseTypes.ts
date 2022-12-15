import { schemaComposer } from 'graphql-compose';
import { GraphQLAidRequestProxy } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestProxy';
import { AidRequestGraphQLType2 } from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestTypes2';

export type GraphQLCreateAidRequestsResponsePayloadProperties = {
  aidRequests: ReadonlyArray<GraphQLAidRequestProxy>;
  postpublishSummary: string;
};

export const GraphQLCreateAidRequestsResponsePayload =
  schemaComposer.createObjectTC<GraphQLCreateAidRequestsResponsePayloadProperties>(
    {
      fields: {
        aidRequests: [AidRequestGraphQLType2],
        postpublishSummary: 'String!',
      },
      name: 'CreateAidRequestsResponsePayload',
    },
  );
