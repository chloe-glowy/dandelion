import { schemaComposer } from 'graphql-compose';
import { GraphQLUserProxy } from 'src/server/adapters/graphql/user2/GraphQLUserProxy';
import { GraphQLUserType2 } from 'src/server/adapters/graphql/user2/GraphQLUserTypes';

export interface GraphQLAidRequestStatusSummaryProperties {
  message(): Promise<string>;
  users(): Promise<ReadonlyArray<GraphQLUserProxy>>;
}

export const GraphQLAidRequestStatusSummaryType =
  schemaComposer.createObjectTC<GraphQLAidRequestStatusSummaryProperties>({
    fields: {
      message: 'String!',
      users: [GraphQLUserType2],
    },
    name: 'AidRequestStatusSummary',
  });
