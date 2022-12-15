import {
  GraphQLAidRequestActionAddOrRemove,
  GraphQLAidRequestActionOptionAPIArgsProperties,
  GraphQLAidRequestActionType,
} from 'src/server/adapters/graphql/aid_request_action_option_api_args/GraphQLAidRequestActionOptionAPIArgsTypes';

export class GraphQLAidRequestMarkAsCompleteActionOptionAPIArgs
  implements GraphQLAidRequestActionOptionAPIArgsProperties
{
  public async addOrRemove(): Promise<GraphQLAidRequestActionAddOrRemove> {
    return 'Add';
  }
  public async actionType(): Promise<GraphQLAidRequestActionType> {
    return 'Completed';
  }
}
