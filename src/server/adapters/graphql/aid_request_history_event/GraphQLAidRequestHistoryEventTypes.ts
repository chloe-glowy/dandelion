import { schemaComposer } from 'graphql-compose';
import { GraphQLUserProxy } from 'src/server/adapters/graphql/user2/GraphQLUserProxy';
import { GraphQLUserType2 } from 'src/server/adapters/graphql/user2/GraphQLUserTypes';

export interface GraphQLAidRequestHistoryEventProperties {
  actor(): Promise<GraphQLUserProxy | null>;
  id(): Promise<string>;
  isComment(): Promise<boolean>;
  message(): Promise<string>;
  when(): Promise<string>;
}

export const GraphQLAidRequestHistoryEventType =
  schemaComposer.createObjectTC<GraphQLAidRequestHistoryEventProperties>({
    fields: {
      actor: GraphQLUserType2,
      id: 'String!',
      isComment: 'Boolean!',
      message: 'String!',
      when: 'String!',
    },
    name: 'AidRequestHistoryEvent2',
  });
