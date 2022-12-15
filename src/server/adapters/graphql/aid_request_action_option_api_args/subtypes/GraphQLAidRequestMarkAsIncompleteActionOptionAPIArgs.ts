import {
  GraphQLAidRequestActionAddOrRemove,
  GraphQLAidRequestActionOptionAPIArgsProperties,
  GraphQLAidRequestActionType,
} from 'src/server/adapters/graphql/aid_request_action_option_api_args/GraphQLAidRequestActionOptionAPIArgsTypes';

export class GraphQLAidRequestMarkAsIncompleteActionOptionAPIArgs
  implements GraphQLAidRequestActionOptionAPIArgsProperties
{
  public async addOrRemove(): Promise<GraphQLAidRequestActionAddOrRemove> {
    return 'Remove';
  }
  public async actionType(): Promise<GraphQLAidRequestActionType> {
    return 'Completed';
  }
}
