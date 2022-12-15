import { schemaComposer } from 'graphql-compose';
import {
  GraphQLAidRequestActionOptionAPIArgsProperties,
  GraphQLAidRequestActionOptionAPIArgsType,
} from 'src/server/adapters/graphql/aid_request_action_option_api_args/GraphQLAidRequestActionOptionAPIArgsTypes';

export interface GraphQLAidRequestActionOptionProperties {
  message(): Promise<string>;
  apiArgs(): Promise<GraphQLAidRequestActionOptionAPIArgsProperties>;
  icon(): Promise<string>;
}

export const AidRequestActionOptionGraphQLType2 =
  schemaComposer.createObjectTC<GraphQLAidRequestActionOptionProperties>({
    fields: {
      apiArgs: GraphQLAidRequestActionOptionAPIArgsType,
      icon: 'String',
      message: 'String!',
    },
    name: 'AidRequestActionOption2',
  });
