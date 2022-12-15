import { schemaComposer } from 'graphql-compose';
import {
  GraphQLAidRequestActionAddOrRemove,
  GraphQLAidRequestActionType,
} from 'src/server/adapters/graphql/aid_request_action_option_api_args/GraphQLAidRequestActionOptionAPIArgsTypes';

export type GraphQLAidRequestActionInputType = Readonly<{
  actionType: GraphQLAidRequestActionType;
  addOrRemove: GraphQLAidRequestActionAddOrRemove;
  commentValue?: string;
  newValue?: string;
  oldValue?: string;
}>;

export type GraphQLEditAidRequestInputArgsType = Readonly<{
  aidRequestID: string;
  action: GraphQLAidRequestActionInputType;
}>;

const GraphQLAidRequestActionInput = schemaComposer.createInputTC({
  fields: {
    actionType: 'AidRequestActionType2',
    addOrRemove: 'AidRequestAddOrRemove',
    commentValue: 'String',
    newValue: 'String',
    oldValue: 'String',
  },
  name: 'AidRequestActionInput2',
});

export const GraphQLEditAidRequestInputArgs = {
  action: GraphQLAidRequestActionInput,
  aidRequestID: 'String!',
};
