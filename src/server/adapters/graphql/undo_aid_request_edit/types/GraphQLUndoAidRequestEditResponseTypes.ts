import { schemaComposer } from 'graphql-compose';
import {
  AidRequestGraphQLType2,
  GraphQLAidRequestProperties,
} from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestTypes2';

export type GraphQLUndoAidRequestEditResponsePayloadProperties = Readonly<{
  aidRequest: GraphQLAidRequestProperties;
}>;

export const GraphQLUndoAidRequestEditResponsePayload =
  schemaComposer.createObjectTC<GraphQLUndoAidRequestEditResponsePayloadProperties>(
    {
      fields: {
        aidRequest: AidRequestGraphQLType2,
      },
      name: 'UndoAidRequestEditResponsePayload',
    },
  );
