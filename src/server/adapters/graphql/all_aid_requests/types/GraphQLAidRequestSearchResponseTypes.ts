import { schemaComposer } from 'graphql-compose';
import {
  AidRequestGraphQLType2,
  GraphQLAidRequestProperties,
} from 'src/server/adapters/graphql/aid_request2/GraphQLAidRequestTypes2';

type AidRequestEdge2 = {
  node: GraphQLAidRequestProperties;
};

export type AidRequestConnectionType2 = {
  edges: Array<AidRequestEdge2>;
  pageInfo: {
    endCursor: string | null;
    hasNextPage: boolean;
  };
};

const PageInfoGraphQLType = schemaComposer.createObjectTC({
  fields: {
    endCursor: 'String',
    hasNextPage: 'Boolean!',
  },
  name: 'PageInfo2',
});

const AidRequestEdgeGraphQLType = schemaComposer.createObjectTC({
  fields: {
    node: AidRequestGraphQLType2,
  },
  name: 'AidRequestEdge2',
});

export const AidRequestConnectionGraphQLType = schemaComposer.createObjectTC({
  fields: {
    edges: [AidRequestEdgeGraphQLType],
    pageInfo: PageInfoGraphQLType,
  },
  name: 'AidRequestConnection2',
});
