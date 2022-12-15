import { schemaComposer } from 'graphql-compose';

export interface GraphQLUserProperties {
  id(): Promise<string>;
  displayName(): Promise<string>;
}

export const GraphQLUserType2 =
  schemaComposer.createObjectTC<GraphQLUserProperties>({
    fields: {
      displayName: 'String',
      id: 'String!',
    },
    name: 'User2',
  });
