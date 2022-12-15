import { schemaComposer } from 'graphql-compose';

export interface GraphQLSharingGroupProperties {
  id(): Promise<string>;
  displayName(): Promise<string>;
}

export const SharingGroupGraphQLType2 =
  schemaComposer.createObjectTC<GraphQLSharingGroupProperties>({
    fields: {
      displayName: 'String!',
      id: 'String!',
    },
    name: 'SharingGroup2',
  });
